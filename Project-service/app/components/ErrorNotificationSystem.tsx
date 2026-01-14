"use client"

import React, { useState, useEffect } from 'react';
import { X, AlertCircle, AlertTriangle, Info, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

interface ErrorNotification {
  id: string;
  type: 'error' | 'warning' | 'info' | 'success';
  title: string;
  message: string;
  timestamp: number;
  persistent?: boolean;
  actions?: Array<{
    label: string;
    action: () => void;
  }>;
}

interface ErrorNotificationSystemProps {
  maxNotifications?: number;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}

/**
 * Error Notification System Component
 * Displays user-facing error notifications with actions
 */
export function ErrorNotificationSystem({ 
  maxNotifications = 5,
  position = 'top-right'
}: ErrorNotificationSystemProps) {
  const [notifications, setNotifications] = useState<ErrorNotification[]>([]);

  useEffect(() => {
    // Import and subscribe to notification manager
    let unsubscribe: (() => void) | null = null;

    const initializeNotifications = async () => {
      try {
        const { errorHandlers } = await import('../lib/preference-utils');
        
        unsubscribe = errorHandlers.notificationManager.subscribe((newNotifications: ErrorNotification[]) => {
          setNotifications(newNotifications.slice(0, maxNotifications));
        });

        // Get initial notifications
        const initialNotifications = errorHandlers.notificationManager.getNotifications();
        setNotifications(initialNotifications.slice(0, maxNotifications));
      } catch (error) {
        console.error('Failed to initialize notification system:', error);
      }
    };

    initializeNotifications();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [maxNotifications]);

  const removeNotification = async (id: string) => {
    try {
      const { errorHandlers } = await import('../lib/preference-utils');
      errorHandlers.notificationManager.removeNotification(id);
    } catch (error) {
      console.error('Failed to remove notification:', error);
    }
  };

  const clearAllNotifications = async () => {
    try {
      const { errorHandlers } = await import('../lib/preference-utils');
      errorHandlers.notificationManager.clearAll();
    } catch (error) {
      console.error('Failed to clear notifications:', error);
    }
  };

  const getIcon = (type: ErrorNotification['type']) => {
    switch (type) {
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'info':
        return <Info className="h-5 w-5 text-blue-500" />;
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <Info className="h-5 w-5 text-gray-500" />;
    }
  };

  const getPositionClasses = () => {
    switch (position) {
      case 'top-left':
        return 'top-4 left-4';
      case 'bottom-right':
        return 'bottom-4 right-4';
      case 'bottom-left':
        return 'bottom-4 left-4';
      case 'top-right':
      default:
        return 'top-4 right-4';
    }
  };

  const getBorderColor = (type: ErrorNotification['type']) => {
    switch (type) {
      case 'error':
        return 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950';
      case 'warning':
        return 'border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950';
      case 'info':
        return 'border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950';
      case 'success':
        return 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950';
      default:
        return 'border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-950';
    }
  };

  if (notifications.length === 0) {
    return null;
  }

  return (
    <div className={`fixed ${getPositionClasses()} z-50 space-y-2 max-w-sm w-full`}>
      {notifications.length > 1 && (
        <div className="flex justify-end mb-2">
          <Button
            variant="outline"
            size="sm"
            onClick={clearAllNotifications}
            className="text-xs"
          >
            Clear All
          </Button>
        </div>
      )}
      
      {notifications.map((notification) => (
        <Card
          key={notification.id}
          className={`${getBorderColor(notification.type)} shadow-lg animate-in slide-in-from-right-full duration-300`}
        >
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-0.5">
                {getIcon(notification.type)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-foreground">
                      {notification.title}
                    </h4>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {notification.message}
                    </p>
                  </div>
                  
                  {!notification.persistent && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeNotification(notification.id)}
                      className="ml-2 h-6 w-6 p-0 hover:bg-transparent"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                
                {notification.actions && notification.actions.length > 0 && (
                  <div className="mt-3 flex space-x-2">
                    {notification.actions.map((action, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          action.action();
                          if (!notification.persistent) {
                            removeNotification(notification.id);
                          }
                        }}
                        className="text-xs"
                      >
                        {action.label}
                      </Button>
                    ))}
                  </div>
                )}
                
                {notification.persistent && (
                  <div className="mt-3 flex justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeNotification(notification.id)}
                      className="text-xs"
                    >
                      Dismiss
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

/**
 * Hook for programmatically adding notifications
 */
export function useErrorNotifications() {
  const addNotification = async (notification: Omit<ErrorNotification, 'id' | 'timestamp'>) => {
    try {
      const { errorHandlers } = await import('../lib/preference-utils');
      return errorHandlers.notificationManager.addNotification(notification);
    } catch (error) {
      console.error('Failed to add notification:', error);
      return null;
    }
  };

  const removeNotification = async (id: string) => {
    try {
      const { errorHandlers } = await import('../lib/preference-utils');
      errorHandlers.notificationManager.removeNotification(id);
    } catch (error) {
      console.error('Failed to remove notification:', error);
    }
  };

  const clearAll = async () => {
    try {
      const { errorHandlers } = await import('../lib/preference-utils');
      errorHandlers.notificationManager.clearAll();
    } catch (error) {
      console.error('Failed to clear notifications:', error);
    }
  };

  return {
    addNotification,
    removeNotification,
    clearAll
  };
}

/**
 * Convenience functions for common notification types
 */
export const notifications = {
  async error(title: string, message: string, actions?: ErrorNotification['actions']) {
    const { errorHandlers } = await import('../lib/preference-utils');
    return errorHandlers.notificationManager.addNotification({
      type: 'error',
      title,
      message,
      actions
    });
  },

  async warning(title: string, message: string, actions?: ErrorNotification['actions']) {
    const { errorHandlers } = await import('../lib/preference-utils');
    return errorHandlers.notificationManager.addNotification({
      type: 'warning',
      title,
      message,
      actions
    });
  },

  async info(title: string, message: string, actions?: ErrorNotification['actions']) {
    const { errorHandlers } = await import('../lib/preference-utils');
    return errorHandlers.notificationManager.addNotification({
      type: 'info',
      title,
      message,
      actions
    });
  },

  async success(title: string, message: string, actions?: ErrorNotification['actions']) {
    const { errorHandlers } = await import('../lib/preference-utils');
    return errorHandlers.notificationManager.addNotification({
      type: 'success',
      title,
      message,
      actions
    });
  }
};