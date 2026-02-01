import { useEffect, useState } from 'react';
import { supabase } from '../../services/supabase';

export interface ScheduleItem {
  id: string;
  subject: string;
  day: string;
  start_time: string;
  end_time: string;
  location: string | null;
}

export const useSchedule = () => {
  const [schedule, setSchedule] = useState<ScheduleItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSchedule = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('schedules')
        .select('*')
        .order('start_time', { ascending: true });

      if (error) {
        console.error('Error fetching schedule:', error);
      } else {
        setSchedule(data || []);
      }
    } catch (err) {
      console.error('Unexpected error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedule();
  }, []);

  return { schedule, loading, refetch: fetchSchedule };
};
