export default function cashier ({ next, store}) {
    if(!store.getters.auth.isCashier) {
        // return next({
        //     name: 'Auth'
        // });
        this.$router.go({ name: 'Auth', query: { redirect: '/' } });
    }

    return next()
}