export default {
    layout: state => state.layout,
    theme: state => state.theme,
    user: state => state.user,
    permission: state => state.user.permission
};