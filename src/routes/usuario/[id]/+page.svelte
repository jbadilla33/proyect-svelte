<script lang="ts">
  import { page } from '$app/stores';
  import { usuarioLogueado } from '$lib/authStore';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';

  interface UsuarioCompleto {
    nomter: string;
    dvid: string;
    numid: number;
    tipoid: string;
    username: string;
  }

  let datosCompletos: UsuarioCompleto | null = null;

  $: idDesdeUrl = $page.params.id;

  onMount(async () => {
    if (!$usuarioLogueado) {
      goto('/');
      return;
    }

    console.log('ID desde URL:', idDesdeUrl);
    try {
      const response = await fetch(`http://localhost:3000/api/datauser/${idDesdeUrl}`);

      if (response.ok) {
        const resJson = await response.json();
        datosCompletos = resJson.usuario;
        console.log('Datos traídos de Postgres:', datosCompletos);
      } else {
        console.error('Error al buscar datos adicionales');
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  });
</script>

{#if $usuarioLogueado && datosCompletos !== null}
  <div>
    <main>
      <h1>Consola de administración</h1>
      <p>Bienvenido de nuevo, {datosCompletos.nomter}</p>
      <p>Cedula {datosCompletos.numid}</p>

      <button
        on:click={() => {
          usuarioLogueado.set(null);
          goto('/');
        }}
      >
        Cerrar Sesión
      </button>
    </main>
  </div>
{:else}
  <p>Cargando datos del perfil...</p>
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
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  button:hover {
    background-color: #0056b3;
  }
</style>
