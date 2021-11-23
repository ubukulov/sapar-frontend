export default function auth ({ next, store}) {
    if(!store.getters.auth.isAuth) {
        return next({
            name: 'Auth'
        });
    }

    return next()
}