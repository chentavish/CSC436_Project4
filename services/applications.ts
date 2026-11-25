import {
    supabase,
    type Application,
    type NewApplication,
    type ApplicationChanges,
  } from '../data/supabase.ts';
  
  export type { Application, NewApplication, ApplicationChanges };
  
  export type ApplicationFilters = {
    status?: string;
    company?: string;
  };
  
  export async function listApplications(filters: ApplicationFilters = {}): Promise<Application[]> {
    const { status, company } = filters;
    let query = supabase.from('applications').select('*').order('applied_on', { ascending: false });
    if (status) query = query.ilike('status', status);
    if (company) query = query.ilike('company', `%${company}%`);
  
    const { data, error } = await query;
    if (error) throw error;
    return data;
  }
  
  export async function getApplication(id: number): Promise<Application | null> {
    const { data, error } = await supabase.from('applications').select('*').eq('id', id).maybeSingle();
    if (error) throw error;
    return data;
  }
  
  export async function createApplication(application: NewApplication): Promise<Application> {
    const { data, error } = await supabase.from('applications').insert(application).select().single();
    if (error) throw error;
    return data;
  }
  
  export async function updateApplication(
    id: number,
    changes: ApplicationChanges
  ): Promise<Application | null> {
    const { data, error } = await supabase
      .from('applications')
      .update(changes)
      .eq('id', id)
      .select()
      .maybeSingle();
    if (error) throw error;
    return data;
  }
  
  export async function deleteApplication(id: number): Promise<boolean> {
    const { data, error } = await supabase.from('applications').delete().eq('id', id).select();
    if (error) throw error;
    return data.length > 0;
  }