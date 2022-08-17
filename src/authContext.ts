import { writable, type Writable } from 'svelte/store';
import type { User } from 'firebase/auth';

export const auth: Writable<User | null> = writable(null);
