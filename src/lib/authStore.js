import { writable } from 'svelte/store';

/** @type {import('svelte/store').Writable<{id_usuario: number, username: string, nombre: string} | null>} */
export const usuarioLogueado = writable(null);
