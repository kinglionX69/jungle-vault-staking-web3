import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, Gift, AlertTriangle, Users, Star, X, Check } from 'lucide-react';
import { CreatorNotification } from '@/data/mockCreatorDashboard';

interface NotificationsSectionProps {
  notifications: CreatorNotification[];
  onMarkAsRead?: (notificationId: string) => void;
  onMarkAllAsRead?: () => void;
  onDismiss?: (notificationId: string) => void;
}

const NotificationsSection = ({ 
  notifications, 
  onMarkAsRead, 
  onMarkAllAsRead,
  onDismiss 
}: NotificationsSectionProps) => {
  const [filter, setFilter] = useState<'all' | 'unread' | 'high'>('all');

  const getNotificationIcon = (type: CreatorNotification['type']) => {
    switch (type) {
      case 'milestone':
        return <Gift className="w-5 h-5 text-yellow-400" />;
      case 'capacity_alert':
        return <AlertTriangle className="w-5 h-5 text-orange-400" />;
      case 'new_staker':
        return <Users className="w-5 h-5 text-blue-400" />;
      case 'reward_claim':
        return <Star className="w-5 h-5 text-purple-400" />;
      default:
        return <Bell className="w-5 h-5 text-gray-400" />;
    }
  };

  const getPriorityColor = (priority: CreatorNotification['priority']) => {
    switch (priority) {
      case 'high':
        return 'border-red-400 text-red-400';
      case 'medium':
        return 'border-yellow-400 text-yellow-400';
      case 'low':
        return 'border-blue-400 text-blue-400';
      default:
        return 'border-gray-400 text-gray-400';
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'unread') return !notification.read;
    if (filter === 'high') return notification.priority === 'high';
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;
  const highPriorityCount = notifications.filter(n => n.priority === 'high' && !n.read).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h3 className="text-xl font-bold text-white pixel-text text-pixel-glow">Notifications</h3>
          {unreadCount > 0 && (
            <Badge variant="outline" className="border-red-400 text-red-400">
              {unreadCount} unread
            </Badge>
          )}
        </div>
        
        {unreadCount > 0 && (
          <Button
            variant="outline"
            size="sm"
            className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white"
            onClick={onMarkAllAsRead}
          >
            <Check className="w-4 h-4 mr-2" />
            Mark All Read
          </Button>
        )}
      </div>

      {/* Notification Summary */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="jungle-card p-4 text-center">
          <div className="text-2xl font-bold text-red-400 mb-1">{highPriorityCount}</div>
          <div className="text-jungle-300 text-sm">High Priority</div>
        </Card>
        
        <Card className="jungle-card p-4 text-center">
          <div className="text-2xl font-bold text-yellow-400 mb-1">{unreadCount}</div>
          <div className="text-jungle-300 text-sm">Unread</div>
        </Card>
        
        <Card className="jungle-card p-4 text-center">
          <div className="text-2xl font-bold text-blue-400 mb-1">{notifications.length}</div>
          <div className="text-jungle-300 text-sm">Total</div>
        </Card>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-2">
        <Button
          variant={filter === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('all')}
          className={filter === 'all' ? '' : 'border-jungle-400 text-jungle-400 hover:bg-jungle-400 hover:text-white'}
        >
          All ({notifications.length})
        </Button>
        
        <Button
          variant={filter === 'unread' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('unread')}
          className={filter === 'unread' ? '' : 'border-jungle-400 text-jungle-400 hover:bg-jungle-400 hover:text-white'}
        >
          Unread ({unreadCount})
        </Button>
        
        <Button
          variant={filter === 'high' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('high')}
          className={filter === 'high' ? '' : 'border-jungle-400 text-jungle-400 hover:bg-jungle-400 hover:text-white'}
        >
          High Priority ({highPriorityCount})
        </Button>
      </div>

      {/* Notifications List */}
      <Card className="jungle-card p-6">
        <div className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-8">
              <Bell className="w-12 h-12 text-jungle-400 mx-auto mb-4" />
              <h4 className="text-lg font-bold text-jungle-300 mb-2">No notifications</h4>
              <p className="text-jungle-400">You're all caught up!</p>
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <div 
                key={notification.id} 
                className={`flex items-start justify-between p-4 rounded-lg transition-colors ${
                  notification.read 
                    ? 'bg-jungle-800/30 border border-jungle-700' 
                    : 'bg-jungle-700/50 border border-jungle-600'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-jungle-700">
                    {getNotificationIcon(notification.type)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-white font-semibold">{notification.poolName}</span>
                      <Badge variant="outline" className={getPriorityColor(notification.priority)}>
                        {notification.priority}
                      </Badge>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-blue-400 rounded-full" />
                      )}
                    </div>
                    
                    <p className="text-jungle-300 text-sm mb-2">{notification.message}</p>
                    
                    <div className="text-jungle-400 text-xs">
                      {formatTimeAgo(notification.timestamp)}
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  {!notification.read && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white"
                      onClick={() => onMarkAsRead?.(notification.id)}
                    >
                      <Check className="w-3 h-3" />
                    </Button>
                  )}
                  
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-red-400 text-red-400 hover:bg-red-400 hover:text-white"
                    onClick={() => onDismiss?.(notification.id)}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
};

export default NotificationsSection;