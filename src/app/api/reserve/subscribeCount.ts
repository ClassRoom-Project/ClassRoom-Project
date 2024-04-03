import { supabase } from '../supabase/supabase';

export const changes = supabase
  .channel('table-db-changes')
  .on(
    'postgres_changes',
    {
      event: '*',
      schema: 'public',
      table: 'class'
    },
    (payload) => console.log(payload)
  )
  .subscribe();
