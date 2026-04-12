import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { prefetchInboxMessagesForUser } from '../storage/messagesInboxCache';

export function InboxPrefetchOnLaunch() {
  const { user, loading } = useAuth();
  useEffect(() => {
    if (loading || !user?.id) return;
    void prefetchInboxMessagesForUser(user.id);
  }, [loading, user?.id]);
  return null;
}
