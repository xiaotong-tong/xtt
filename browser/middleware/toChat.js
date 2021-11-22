export default function ({ route, redirect }) {
    if (route.fullPath === '/wordbook/play') {
        return redirect('wordbook/play/chat');
    }
  }