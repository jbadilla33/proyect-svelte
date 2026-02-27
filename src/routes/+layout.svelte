<script lang="ts">
  import favicon from '$lib/assets/favicon.svg';
  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
  <title>Sistema de Nóminas</title>
</svelte:head>

<header class="navbar">
  <div class="logo">
    <span class="logo-icon">✦</span>
    <strong>Sistema De Nominas</strong>
  </div>
  <nav class="nav-links">
    <a href="/">Ayuda</a>
    <a href="/">Seguridad</a>
    <a href="/">Soporte</a>
  </nav>
</header>

{@render children()}

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    font-family: 'Inter', system-ui, sans-serif;
    background-color: #f8fafc;
    color: #1e293b;
  }

  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 4rem;
    background: white;
    border-bottom: 1px solid #e2e8f0;
  }

  .logo {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.2rem;
  }

  .logo-icon {
    background: #2563eb;
    color: white;
    padding: 2px 8px;
    border-radius: 4px;
    font-weight: bold;
  }

  .nav-links a {
    margin-left: 1.5rem;
    text-decoration: none;
    color: #64748b;
    font-size: 0.9rem;
    font-weight: 500;
  }

  @media (max-width: 640px) {
    .navbar {
      padding: 1rem;
      flex-direction: column;
      gap: 1rem;
    }

    .nav-links {
      margin: 0;
      display: flex;
      gap: 10px;
    }

    .nav-links a {
      margin-left: 0;
      font-size: 0.8rem;
    }
  }
</style>
