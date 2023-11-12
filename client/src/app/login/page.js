'use client';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { mutate: loginMutation, isLoading: isLoginMutationLoading } =
    useMutation({
      queryKey: ['login'],
      mutationFn: ({ email, password }) => login(email, password),
      onSuccess: (data) => {
        console.log('Mutation Data:', data);

        queryClient.invalidateQueries(['login']);
      },
    });

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    loginMutation({ email, password });
  };

  return (
    <div className="text-white">
      <h1>Login</h1>

      <from action="POST" onSubmit={handleLoginSubmit}>
        <input
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </from>
    </div>
  );
}
