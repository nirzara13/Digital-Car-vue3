<template>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <div class="contact-container">
      <h1 class="contact-title">Contactez-nous</h1>
      <p class="contact-intro">
        Si vous avez des questions ou des suggestions, n'hésitez pas à nous contacter. Les techniciens et administrateurs peuvent aussi consulter la FAQ ci-dessous.
      </p>
  
      <!-- Formulaire de contact -->
      <form class="contact-form" @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="name">Nom :</label>
          <input type="text" id="name" v-model="form.name" required />
        </div>
        <div class="form-group">
          <label for="email">Email :</label>
          <input type="email" id="email" v-model="form.email" required />
        </div>
        <div class="form-group">
          <label for="subject">Sujet :</label>
          <select id="subject" v-model="form.subject" required>
            <option value="question-technique">Question technique</option>
            <option value="probleme-acces">Problème d'accès</option>
            <option value="suggestion">Suggestion</option>
            <option value="autre">Autre</option>
          </select>
        </div>
        <div class="form-group">
          <label for="message">Message :</label>
          <textarea id="message" v-model="form.message" required></textarea>
        </div>
  
        <!-- CAPTCHA -->
        <div class="form-group captcha">
          <label for="captcha">Résolvez : {{ captchaQuestion }}</label>
          <input
            type="text"
            id="captcha"
            v-model="form.captchaAnswer"
            required
          />
        </div>
  
        <button type="submit" class="submit-btn">Envoyer</button>
      </form>
  
      <!-- FAQ Section -->
      <section class="faq-section">
        <h2>FAQ - Questions fréquentes</h2>
        <ul>
          <li><strong>Comment accéder aux PDF ?</strong> : Connectez-vous à votre tableau de bord et naviguez jusqu'à la section correspondante.</li>
          <li><strong>Que faire en cas de problème technique ?</strong> : Contactez un administrateur ou utilisez ce formulaire.</li>
          <li><strong>Comment signaler une erreur ?</strong> : Utilisez le formulaire ci-dessus en sélectionnant "Suggestion".</li>
        </ul>
      </section>
    </div>
    <br>
    <br>
    <br>

  </template>
  
  <script>
  export default {
    data() {
      return {
        form: {
          name: '',
          email: '',
          subject: '',
          message: '',
          captchaAnswer: '',
        },
        captchaQuestion: '',
        captchaSolution: null,
      };
    },
    methods: {
      generateCaptcha() {
        const num1 = Math.floor(Math.random() * 10);
        const num2 = Math.floor(Math.random() * 10);
        this.captchaQuestion = `${num1} + ${num2}`;
        this.captchaSolution = num1 + num2;
      },
      handleSubmit() {
        if (parseInt(this.form.captchaAnswer) !== this.captchaSolution) {
          alert('CAPTCHA incorrect. Veuillez réessayer.');
          this.generateCaptcha();
          return;
        }
  
        alert('Formulaire envoyé avec succès !');
        // Vous pouvez ajouter une logique pour envoyer les données ici.
      },
    },
    mounted() {
      this.generateCaptcha();
    },
  };
  </script>
  
  <style scoped>
  .contact-container {
    background-color: #00171F;
    color: #FFFFFF;
    padding: 2rem;
    border-radius: 10px;
    max-width: 800px;
    margin: 2rem auto;
    animation: fadeIn 1s ease-in-out;
  }
  
  .contact-title {
    color: #00A8E8;
    text-align: center;
    margin-bottom: 1rem;
  }
  
  .contact-intro {
    text-align: center;
    font-size: 1.2rem;
    margin-bottom: 2rem;
  }
  
  .contact-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .form-group {
    display: flex;
    flex-direction: column;
  }
  
  input,
  textarea,
  select {
    padding: 0.5rem;
    border: 1px solid #003459;
    border-radius: 5px;
  }
  
  textarea {
    resize: none;
    height: 100px;
  }
  
  .submit-btn {
    background-color: #007EA7;
    color: #FFFFFF;
    padding: 0.7rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;
  }
  
  .submit-btn:hover {
    background-color: #003459;
  }
  
  .faq-section {
    margin-top: 2rem;
    background-color: #003459;
    padding: 1rem;
    border-radius: 5px;
  }
  
  .faq-section h2 {
    color: #00A8E8;
  }
  
  .faq-section ul {
    list-style: none;
    padding: 0;
  }
  
  .faq-section li {
    margin: 0.5rem 0;
  }
  
  /* Animations */
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10%);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  </style>
  