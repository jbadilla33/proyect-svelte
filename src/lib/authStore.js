import { writable } from "svelte/store";

/** @type {import('svelte/store').Writable<{codusr: string, username: string, nombre: string} | null>} */
export const usuarioLogueado = writable(null);
