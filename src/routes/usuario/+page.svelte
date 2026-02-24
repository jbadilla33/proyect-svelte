<script lang="ts">
    import { usuarioLogueado } from '$lib/authStore';
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';

    let datosCompletos = null; // Variable para guardar lo que responda la API

    onMount(async () => { // Agregamos async aquí
        if (!$usuarioLogueado) {
            goto('/');
            return;
        }

        const datosUsuario = $usuarioLogueado;
        
        try {
            // 1. Usamos GET porque así definimos la ruta en Node.js
            // 2. Usamos el campo correcto (portal_id o codusr según tu tabla)
            const response = await fetch(`http://localhost:3000/api/users/${datosUsuario.portal_id}`);
            
            if (response.ok) {
                const resJson = await response.json();
                datosCompletos = resJson.usuario; // Guardamos los datos de la DB
                console.log('Datos traídos de Postgres:', datosCompletos);
            } else {
                console.error('Error al buscar datos adicionales');
            }
        } catch (error) {
            console.error('Error de red:', error);
        }
    });
</script>

{#if $usuarioLogueado && datosCompletos}
    <main>
        <h1>Panel de Control</h1>
        <p>Bienvenido de nuevo, <strong>{$usuarioLogueado.nombre}</strong></p>
        <p>Tu ID es: {$usuarioLogueado.codusr}</p>

        <button on:click={() => { usuarioLogueado.set(null); goto('/'); }}>
            Cerrar Sesión
        </button>
    </main>
{/if}

<style>
    main {
        max-width: 600px;
        margin: 50px auto;
        padding: 20px;
        background-color: #f0f0f0;
        border-radius: 8px;
        text-align: center;
    }

    h1 {
        color: #333;
    }

    p {
        font-size: 18px;
        color: #555;
    }

    button {
        margin-top: 20px;
        padding: 10px 20px;
        font-size: 16px;
        background-color: #007BFF;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

    button:hover {
        background-color: #0056b3;
    }

    /* --- IGNORE ---
     .error {
         font-size: 25px;
         animation: parpadeo 1s infinite;

         text-shadow:
             0 0 5px red,
             0 0 10px red,
             0 0 20px red,
             0 0 40px red,
             0 0 80px red;*/
</style>