<script lang="ts">
    import { goto } from '$app/navigation'; // Importación vital de SvelteKit
    import { usuarioLogueado } from '$lib/authStore';
    import { fade } from 'svelte/transition';

    let usuario = 'JBADILLA'; 
    let password = '1234';
    let errorCredenciales = '';

    async function handleLogin(e: SubmitEvent) {
        e.preventDefault();

        errorCredenciales = "";
        const response = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: usuario, password: password })
        });

        const resultado = await response.json();

        console.log(resultado);

        if (resultado.status) {
            errorCredenciales = resultado.message || "Error en el servidor";
            return;
        }

        if (resultado.success) {
            usuarioLogueado.set(resultado.usuario);

            goto('/usuario'); 
        } else {
            errorCredenciales = "Usuario o clave incorrectos";
            return;
        }
    }
</script>

<main>
    <div class="login-container">
        <h1 class="titulo">Bienvenido</h1>
        <form onsubmit={handleLogin}>
            <input type="text" bind:value={usuario} onfocus={() => errorCredenciales = ''} />
            <input type="password" bind:value={password} onfocus={() => errorCredenciales = ''}/>
            <button type="submit">Entrar</button>
        </form>
    </div>
    {#if errorCredenciales}  
        <div class="alerta-container" transition:fade={{ duration: 200 }}>
            <div class="alerta-box">
                <span class="icono">⚠️</span>
                <p>{errorCredenciales}</p>
            </div>
        </div> 
    {/if}

   
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
            border: 2px solid rgb(6, 243, 223);
            border-radius: 5px;
            width: 300px;
            height: 300px;
            justify-content: center;
            align-items: center;
            display: flex;
            flex-direction: column
        }

    .titulo {
        color: rgb(6, 243, 223);
        font-size: 35px;
        margin-bottom: 20px;
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

    input:hover{
        border: 2px solid rgb(6, 243, 223);

    }

    input:focus {
        outline: none;
        border: 2px solid rgb(243, 6, 6);
    }

    button {
        padding: 8px;
        font-size: 16px;
        cursor: pointer;
        border-radius: 5px;
        border-color: rgb(6, 243, 223);
        background-color: rgb(6, 243, 223);


    }

    button:hover{
            background-color: rgb(6, 243, 223);
    }    


    button:focus{
        outline: none;
        border: 1px solid rgb(243, 6, 6);
    }    

    @keyframes parpadeo {
    0% {
        color: red;    /* Empieza en rojo */
        opacity: 1;    /* Totalmente visible */
    }
    50% {
        color: transparent; /* Se vuelve invisible (o puedes usar otro color) */
        opacity: 0;
    }
    100% {
        color: red;    /* Vuelve a ser rojo */
        opacity: 1;
    }
    }    

/*
@keyframes neon-parpadeo {
  0%, 100% {
    color: #fff; 
    text-shadow: 
      0 0 7px #fff,
      0 0 10px #fff,
      0 0 21px #ff0000,
      0 0 42px #ff0000,
      0 0 82px #ff0000;
  }
  50% {
    color: #ff0000;
    text-shadow: none;
  }
}    */
/*
    .error {
        font-size: 25px;
        animation: parpadeo 1s infinite;
        font-weight: bold;       
        /*
        para el neon
        font-family: 'Arial', sans-serif;
        font-size: 30px;
        font-weight: bold;
        padding: 20px;
        text-align: center;
        animation: neon-parpadeo 1.5s infinite alternate; 
        */
    

    .alerta-container {
        
    position: fixed;
    top: 0px; 
    left: 50%;
    transform: translateX(-50%); /* Centrado horizontal */
    z-index: 9999; /* Asegura que esté al frente */
    }

    /* El cuadro de la alerta */
    .alerta-box {
    background-color: rgba(0, 0, 0, 0.9); /* Fondo oscuro semitransparente */
    color: white;
    padding: 10px 33px;
    border: 2px solid #ff0000;
    border-radius: 8px;
    display: flex;
    align-items: center;
    gap: 15px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    
    /* Aplicamos la animación al cuadro entero */
    animation: pulso-rojo 1.5s infinite;
    }

    /* Animación de "Pulso" para el cuadro */
    @keyframes pulso-rojo {
    0% {
        box-shadow: 0 0 0px rgba(255, 0, 0, 0.7);
        border-color: #ff0000;
    }
    50% {
        box-shadow: 0 0 30px rgba(255, 0, 0, 1); /* Brillo exterior */
        border-color: #ff5555;
        transform: scale(1.05); /* Crece un poquito */
    }
    100% {
        box-shadow: 0 0 0px rgba(255, 0, 0, 0.7);
        border-color: #ff0000;
    }
    }    
</style>