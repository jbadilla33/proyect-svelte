<script lang="ts">
  import { goto } from '$app/navigation';
  import { usuarioLogueado } from '$lib/authStore';
  import img2 from '$lib/img/img_home_2.jpg';

  // Svelte 5 Runes
  let email = $state('devcoca@gmail.com');
  let password = $state('1234');
  let errorCredenciales = $state('');
  let cargando = $state(false);

  async function handleLogin(e: SubmitEvent) {
    e.preventDefault();
    errorCredenciales = '';
    cargando = true;

    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const resultado = await response.json();

      if (resultado.success) {
        usuarioLogueado.set(resultado.usuario);
        goto(`/usuario/${resultado.usuario.id_usuario}`);
      } else {
        errorCredenciales = resultado.message || 'Credenciales incorrectas';
      }
    } catch (err) {
      errorCredenciales = 'Error de conexión con el servidor';
    } finally {
      cargando = false;
    }
  }
</script>

<div class="page-wrapper">
  <main class="login-card">
    <section class="info-section">
      <div class="info-content">
        <h1>Gestione su fuerza laboral con confianza.</h1>
        <p class="subtitle">La plataforma integral para la gestión de nóminas y RR. HH.</p>
        <div class="dashboard-preview">
          <img src={img2} alt="Dashboard preview" />
        </div>
      </div>
    </section>

    <section class="form-section">
      <div class="form-container">
        <h2>Bienvenido de nuevo</h2>
        <p class="form-instruction">Ingrese sus datos para acceder al panel.</p>

        <form onsubmit={handleLogin}>
          <div class="input-group">
            <label for="email">Email</label>
            <input
              id="email"
              type="email"
              bind:value={email}
              placeholder="name@company.com"
              required
            />
          </div>

          <div class="input-group">
            <div class="label-row">
              <label for="password">Password</label>
              <a href="/" class="forgot-link">¿Olvidó su clave?</a>
            </div>
            <input
              id="password"
              type="password"
              bind:value={password}
              placeholder="••••••••"
              required
            />
          </div>

          {#if errorCredenciales}
            <p class="error">{errorCredenciales}</p>
          {/if}

          <button type="submit" class="btn-primary" disabled={cargando}>
            {cargando ? 'Iniciando sesión...' : 'Entrar'}
          </button>
        </form>
      </div>
    </section>
  </main>
</div>

<style>
  .page-wrapper {
    min-height: calc(100vh - 70px); /* Restamos la altura de la navbar */
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
  }

  .login-card {
    display: flex;
    max-width: 1100px;
    width: 100%;
    background: white;
    border-radius: 20px;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    min-height: 600px;
  }

  .info-section {
    flex: 1;
    background-color: #f1f5f9;
    padding: 3rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .info-section h1 {
    font-size: 2.5rem;
    line-height: 1.1;
    margin-bottom: 1.5rem;
  }

  .dashboard-preview {
    margin-top: 2rem;
    background: #132a2a;
    padding: 1rem;
    border-radius: 12px;
  }

  .dashboard-preview img {
    width: 100%;
    border-radius: 4px;
  }

  .form-section {
    flex: 1;
    padding: 4rem;
    display: flex;
    align-items: center;
  }

  .form-container {
    width: 100%;
    max-width: 380px;
    margin: 0 auto;
  }

  .form-instruction {
    color: #2563eb;
    background: #eff6ff;
    padding: 4px 8px;
    font-size: 0.8rem;
    border-radius: 4px;
    margin-bottom: 2rem;
    display: inline-block;
  }

  .input-group {
    margin-bottom: 1.5rem;
  }

  label {
    display: block;
    font-weight: 600;
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
  }

  input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    box-sizing: border-box;
  }

  .btn-primary {
    width: 100%;
    background: #2563eb;
    color: white;
    border: none;
    padding: 0.8rem;
    border-radius: 8px;
    font-weight: bold;
    cursor: pointer;
  }

  .btn-primary:disabled {
    background: #94a3b8;
  }

  .error {
    color: #dc2626;
    background: #fef2f2;
    padding: 0.75rem;
    border-radius: 8px;
    font-size: 0.85rem;
    margin-bottom: 1rem;
    border: 1px solid #fecaca;
  }

  /* Tablets y Laptops pequeñas */
  @media (max-width: 1024px) {
    .login-card {
      max-width: 90%;
      min-height: auto;
    }

    .info-section {
      padding: 2rem;
    }

    .info-section h1 {
      font-size: 2rem;
    }
  }

  /* Móviles (Pantallas de menos de 768px) */
  @media (max-width: 768px) {
    .login-card {
      flex-direction: column; /* Apilamos las columnas */
      margin: 1rem;
      min-height: auto;
    }

    .info-section {
      padding: 2rem;
      text-align: center;
    }

    .info-section h1 {
      font-size: 1.8rem;
    }

    .subtitle {
      margin: 0 auto;
    }

    .dashboard-preview {
      display: none; /* Escondemos la imagen pesada en móviles para ahorrar espacio */
    }

    .form-section {
      padding: 2rem;
    }
  }
</style>
