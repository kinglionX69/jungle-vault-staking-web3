import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import {
  CreatePoolFormData,
  PoolCreationStep,
  PaymentMethod,
} from "@/types/createPool";
import {
  AVAILABLE_DURATIONS,
  calculateRewardPercentageFromPoolSize,
  validateSimplifiedPool,
  getSimplifiedHealthScore,
  calculateSimplifiedCreatorRewards,
  calculateMinimumRewardByDuration,
  getMinimumRewardPercentage,
  calculateMaxPoolSize,
} from "@/utils/poolEconomics";
import { pricingService } from "@/services/pricingService";
import {
  InputTransactionData,
  useWallet,
} from "@aptos-labs/wallet-adapter-react";
import { TransactionPayload } from "@aptos-labs/ts-sdk";
import { testnetContracts } from "@/services/aptosService";

interface CreatePoolContextType {
  formData: CreatePoolFormData;
  currentStep: number;
  steps: PoolCreationStep[];
  updateFormData: (data: Partial<CreatePoolFormData>) => void;
  updatePaymentInfo: (method: PaymentMethod) => Promise<void>;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  validateCurrentStep: () => boolean;
  submitForm: () => Promise<void>;
  isSubmitting: boolean;
}

const CreatePoolContext = createContext<CreatePoolContextType | undefined>(
  undefined
);

const initialFormData: CreatePoolFormData = {
  stakingToken: null,
  rewardToken: null,
  poolName: "",
  poolParameters: {
    selectedDuration: null,
    baseRewardAmount: 0,
    additionalRewardBudget: 0,
    totalRewardBudget: 0,
    selectedRewardPercentage: 20, // Default to minimum reward percentage
    maxPoolSize: 0,
    baseRewardPercentage: 0,
    effectiveRewardPercentage: 0,
  },
  paymentInfo: {
    method: "APT",
    aptCost: 5,
  },
  nftBoostsEnabled: false,
  nftBoost: null,
  milestonesEnabled: false,
  milestones: [
    {
      id: "early",
      label: "Early Bird",
      thresholdPercentage: 10,
      enabled: false,
      bonusPercentage: 5,
      budgetImpact: 0,
    },
    {
      id: "halfway",
      label: "Halfway Hero",
      thresholdPercentage: 40,
      enabled: false,
      bonusPercentage: 10,
      budgetImpact: 0,
    },
    {
      id: "major",
      label: "Major Milestone",
      thresholdPercentage: 80,
      enabled: false,
      bonusPercentage: 15,
      budgetImpact: 0,
    },
  ],
};

const initialSteps: PoolCreationStep[] = [
  {
    id: 1,
    title: "Token Settings",
    emoji: "🟢",
    completed: false,
    valid: false,
  },
  {
    id: 2,
    title: "Pool Parameters",
    emoji: "🟡",
    completed: false,
    valid: false,
  },
  {
    id: 3,
    title: "NFT Boosts & Milestones",
    emoji: "🟠",
    completed: false,
    valid: false,
  },
  {
    id: 4,
    title: "Review & Confirm",
    emoji: "🟣",
    completed: false,
    valid: false,
  },
];

export const CreatePoolProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormData] = useState<CreatePoolFormData>(initialFormData);
  const { signAndSubmitTransaction } = useWallet();
  const [currentStep, setCurrentStep] = useState(1);
  const [steps, setSteps] = useState<PoolCreationStep[]>(initialSteps);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updatePaymentInfo = async (method: PaymentMethod) => {
    const aptCost = 5; // Fixed cost for simplified pool creation

    if (method === "LIONHEART") {
      setFormData((prev) => ({
        ...prev,
        paymentInfo: {
          method,
          aptCost,
          lionheartCost: 4000, // Fixed discounted price
          originalLionheartCost: 5000, // Fixed original price
          savings: 1000, // Fixed savings (20% of 5000)
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        paymentInfo: {
          method,
          aptCost,
        },
      }));
    }
  };

  const updateFormData = (data: Partial<CreatePoolFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  // Handle duration changes and update minimum reward percentage
  useEffect(() => {
    const params = formData.poolParameters;

    if (params.selectedDuration) {
      const minimumRequired = calculateMinimumRewardByDuration(
        params.selectedDuration
      );
      const minimumRewardPercentage = getMinimumRewardPercentage(
        params.selectedDuration
      );

      // Update reward percentage to minimum if current percentage is below new minimum
      const newRewardPercentage = Math.max(
        params.selectedRewardPercentage,
        minimumRewardPercentage
      );

      // If current reward amount is below new minimum, clear it
      if (
        params.baseRewardAmount > 0 &&
        params.baseRewardAmount < minimumRequired
      ) {
        setFormData((prev) => ({
          ...prev,
          poolParameters: {
            ...prev.poolParameters,
            baseRewardAmount: 0, // Clear invalid amount
            selectedRewardPercentage: newRewardPercentage,
          },
        }));
        return; // Exit early to avoid double updates
      } else if (newRewardPercentage !== params.selectedRewardPercentage) {
        setFormData((prev) => ({
          ...prev,
          poolParameters: {
            ...prev.poolParameters,
            selectedRewardPercentage: newRewardPercentage,
          },
        }));
      }
    }
  }, [formData.poolParameters.selectedDuration]);

  // Auto-calculate pool size and update reward percentages when pool parameters change
  useEffect(() => {
    const params = formData.poolParameters;

    if (
      params.selectedDuration &&
      params.baseRewardAmount > 0 &&
      params.selectedRewardPercentage > 0
    ) {
      // Calculate max pool size based on reward amount and selected reward percentage
      const maxPoolSize = calculateMaxPoolSize(
        params.baseRewardAmount,
        params.selectedRewardPercentage
      );

      const baseRewardPercentage = params.selectedRewardPercentage; // Base reward percentage equals selected percentage
      const totalRewardBudget =
        params.baseRewardAmount + params.additionalRewardBudget;

      // Calculate effective reward percentage properly:
      // Base percentage + NFT boost percentage + milestone bonus percentage
      let effectiveRewardPercentage = baseRewardPercentage;

      // Add NFT boost percentage if enabled
      if (formData.nftBoostsEnabled && formData.nftBoost) {
        effectiveRewardPercentage += formData.nftBoost.boostPercentage;
      }

      // Add milestone bonus percentages if enabled
      if (formData.milestonesEnabled) {
        const enabledMilestones = formData.milestones.filter((m) => m.enabled);
        const totalMilestoneBonus = enabledMilestones.reduce(
          (sum, m) => sum + m.bonusPercentage,
          0
        );
        effectiveRewardPercentage += totalMilestoneBonus;
      }

      const creatorRewards = calculateSimplifiedCreatorRewards({
        ...formData,
        poolParameters: {
          ...params,
          maxPoolSize,
          baseRewardPercentage,
          effectiveRewardPercentage,
          totalRewardBudget,
        },
      });

      setFormData((prev) => ({
        ...prev,
        poolParameters: {
          ...prev.poolParameters,
          maxPoolSize,
          baseRewardPercentage,
          effectiveRewardPercentage,
          totalRewardBudget,
        },
        creatorRewards,
      }));
    }
  }, [
    formData.poolParameters.selectedDuration,
    formData.poolParameters.baseRewardAmount,
    formData.poolParameters.selectedRewardPercentage,
    formData.poolParameters.additionalRewardBudget,
    formData.nftBoostsEnabled,
    formData.nftBoost,
    formData.milestonesEnabled,
    formData.milestones,
  ]);

  const validateCurrentStep = (): boolean => {
    switch (currentStep) {
      case 1:
        return !!(
          formData.stakingToken &&
          formData.rewardToken &&
          formData.poolName
        );
      case 2:
        const validation = validateSimplifiedPool(formData);
        return validation.isValid;
      case 3:
        return true; // Optional step
      case 4:
        return true; // Review step
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (validateCurrentStep() && currentStep < 4) {
      setSteps((prev) =>
        prev.map((step) =>
          step.id === currentStep
            ? { ...step, completed: true, valid: true }
            : step
        )
      );
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const goToStep = (step: number) => {
    if (step >= 1 && step <= 4) {
      setCurrentStep(step);
    }
  };

  const submitForm = async (): Promise<void> => {
    setIsSubmitting(true);
    try {
      // Mock API call
      // await new Promise(resolve => setTimeout(resolve, 2000));
      const feeToken =
        formData.paymentInfo.method == "APT"
          ? testnetContracts.aptos
          : testnetContracts.lion; // Dummy lion heart
      const feeType = formData.paymentInfo.method == "APT" ? 1 : 2;
      //TODO: This is only for testnet
      let stakeT: string, rewardT: string;
      if (formData.stakingToken.symbol == "🦁♥️") {
        stakeT = testnetContracts.lion;
        rewardT = testnetContracts.rocket;
      } else {
        stakeT = testnetContracts.rocket;
        rewardT = testnetContracts.lion;
      }
      console.log(formData);
      const transaction: InputTransactionData = {
       data: { 
        function: `${testnetContracts.staking}::create_pool` as `${string}::${string}::${string}`,
        typeArguments: [stakeT, rewardT, feeToken],
        functionArguments: [
          formData.poolName,
          feeType,
          formData.poolParameters.effectiveRewardPercentage,
          formData.poolParameters.baseRewardAmount,
          formData.poolParameters.selectedDuration.days / 10, //TODO: this is only for testnet
          formData.milestones.map(f => f.thresholdPercentage),
          formData.milestones.map(f => f.bonusPercentage),
          formData?.nftBoost?.boostPercentage ?? 0,
          formData?.nftBoost?.collectionAddress ?? '0x0000000000000000000000000000000000000000000000000000000000000000',
        ],}
      };

      console.log(transaction.data);
      await signAndSubmitTransaction(transaction);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <CreatePoolContext.Provider
      value={{
        formData,
        currentStep,
        steps,
        updateFormData,
        updatePaymentInfo,
        nextStep,
        prevStep,
        goToStep,
        validateCurrentStep,
        submitForm,
        isSubmitting,
      }}
    >
      {children}
    </CreatePoolContext.Provider>
  );
};

export const useCreatePool = () => {
  const context = useContext(CreatePoolContext);
  if (!context) {
    throw new Error("useCreatePool must be used within CreatePoolProvider");
  }
  return context;
};
