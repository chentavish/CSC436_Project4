// The typed database connection. Every database call goes through this client.

import { createClient } from '@supabase/supabase-js';
import type { Database, Tables, TablesInsert, TablesUpdate } from './database.types.ts';
import { config } from '../config/env.ts';

export const supabase = createClient<Database>(config.supabaseUrl, config.supabaseSecretKey);

export type Application = Tables<'applications'>; 
export type NewApplication = TablesInsert<'applications'>; 
export type ApplicationChanges = TablesUpdate<'applications'>; 