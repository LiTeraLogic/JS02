Vue.component('search', {
    props: ["userSearch"],
    template: `
        <input type="text" class="search-field" 
        v-bind:value="userSearch"
        v-on:input="$emit('input', $event.target.value)">
    `
});