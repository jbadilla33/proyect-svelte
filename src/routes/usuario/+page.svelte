<script lang="ts">
    import { usuarioLogueado } from '$lib/authStore';
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';

    console.log('usuarioLogueado:', $usuarioLogueado);

    // "Guardia" de seguridad: si no hay datos, lo regresa al login
    onMount(() => {
        if (!$usuarioLogueado) {
            goto('/');
        }
    });
</script>

{#if $usuarioLogueado}
    <main>
        <h1>Panel de Control</h1>
        <p>Bienvenido de nuevo, <strong>{$usuarioLogueado.nombre}</strong></p>
        <p>Tu ID es: {$usuarioLogueado.codusr}</p>

        <button on:click={() => { usuarioLogueado.set(null); goto('/'); }}>
            Cerrar Sesión
        </button>
    </main>
{/if}