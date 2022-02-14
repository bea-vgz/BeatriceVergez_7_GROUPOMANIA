<template>
  <div class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center">
    <div>
      <div style="font-size: 30px">
        404
      </div>
      <img
        class="img-fluid"
        src="../assets/oups.gif"
        alt="Erreur 404"
      />

      <div
        class="text-h2"
        style="opacity:.4"
      >
        Oops. Il semblerait qu'il y ait une erreur...
      </div>

      <button
        class="q-mt-xl"
        color="white"
        text-color="blue"
        unelevated
        to="/"
        label="Go Home"
        no-caps
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Error404',
};
</script>