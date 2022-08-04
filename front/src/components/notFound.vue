<template>
notfound
</template>

<script>

export default {
name : 'notFound',

mounted () {

console.log('page notfound')
this.$router.push({ name: 'Login' })


}

}

</script>