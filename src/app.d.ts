// src/app.d.ts

import { SupabaseClient, Session } from '@supabase/supabase-js';
import { Database } from './database.types';
import type { Product } from '$lib/interfaces';
import type { S3Client } from '@aws-sdk/client-s3';

declare global {
    namespace App {
        interface Locals {
            supabase: SupabaseClient<Database>;
            getSession(): Promise<Session | null>;
            admin: boolean | null;
        }
        interface PageData {
            session: Session | null;
            supabase: SupabaseClient<Database>;
            s3Client: S3Client;
            blogs: any[];
        }
        type Supabase = SupabaseClient<Database>;
        // interface Error {}
        // interface Platform {}
    }
}
