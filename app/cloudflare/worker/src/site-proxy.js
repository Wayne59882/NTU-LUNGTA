// Public address of the teaching site: https://multicourse-ta.<account>.workers.dev.
// Every request goes unchanged to the teaching-site Worker through a service binding
// (APP), so that Worker keeps its tunnel origin, settings and sign-in.
export default {
  fetch(request,env){return env.APP.fetch(request);}
};
