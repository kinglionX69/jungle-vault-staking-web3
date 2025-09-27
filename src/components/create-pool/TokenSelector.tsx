
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TokenOption } from '@/types/createPool';

interface TokenSelectorProps {
  tokens: TokenOption[];
  selectedToken: TokenOption | null;
  onTokenSelect: (token: TokenOption) => void;
  placeholder?: string;
  disabled?: boolean;
}

const TokenSelector = ({ tokens, selectedToken, onTokenSelect, placeholder = "Select a token", disabled = false }: TokenSelectorProps) => {
  return (
    <Select 
      value={selectedToken?.id || ''} 
      onValueChange={(value) => {
        const token = tokens.find(t => t.id === value);
        if (token) onTokenSelect(token);
      }}
      disabled={disabled}
    >
      <SelectTrigger className={`jungle-card border-jungle-600 text-white ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
        <SelectValue placeholder={placeholder}>
          {selectedToken && (
            <div className="flex items-center gap-2">
              <span className="text-2xl">{selectedToken.emoji}</span>
              <div>
                <div className="font-bold">{selectedToken.name}</div>
                <div className="text-xs text-jungle-300">Balance: {selectedToken.balance} {selectedToken.symbol}</div>
              </div>
            </div>
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent className="jungle-card border-jungle-600 bg-jungle-800">
        {tokens.map(token => (
          <SelectItem key={token.id} value={token.id} className="text-white hover:bg-jungle-700">
            <div className="flex items-center gap-3 py-2">
              <span className="text-2xl">{token.emoji}</span>
              <div>
                <div className="font-bold">{token.name}</div>
                <div className="text-xs text-jungle-300">
                  Balance: {token.balance} {token.symbol}
                </div>
              </div>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default TokenSelector;
