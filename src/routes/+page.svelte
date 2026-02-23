<script lang="ts">
    import { goto } from '$app/navigation'; // Importación vital de SvelteKit
    import { usuarioLogueado } from '$lib/authStore';

    let usuario = 'jbadilla'; 
    let password = '1234';
    let errorCredenciales = '';

    async function handleLogin(e: SubmitEvent) {
        e.preventDefault();
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: usuario, password: password })
        });

        const resultado = await response.json();

        if (resultado.success) {
            usuarioLogueado.set(resultado.usuario);

            goto('/usuario'); 
        } else {
            errorCredenciales = "Usuario o clave incorrectos";
        }
    }
</script>

<main>
    <div class="login-container">
        <h1>Bienvenido</h1>
        <form onsubmit={handleLogin}>
            <input type="text" bind:value={usuario} />
            <input type="password" bind:value={password} />
            <button type="submit">Entrar</button>
        </form>
    </div>
    {#if errorCredenciales} <p class="error">{errorCredenciales}</p> {/if}
</main>

<style>

:global(body) {
    margin: 0;
    padding: 0;
    background-image: url('../lib/img_login.jpg'); /* SvelteKit busca en la carpeta static */
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

    main {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
    }
    .login-container {
            border: 5px solid aquamarine;
            border-radius: 5px;
            width: 300px;
            height: 300px;
            justify-content: center;
            align-items: center;
            display: flex;
            flex-direction: column
        }
    form {
        
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    input {
        padding: 8px;
        font-size: 16px;
    }
    button {
        padding: 8px;
        font-size: 16px;
        cursor: pointer;
    }
    .error {
        color: red;
    }
</style>