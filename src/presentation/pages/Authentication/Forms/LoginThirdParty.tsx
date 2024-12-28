export default function LoginThirdParty() {
  return (
    <div className="flex flex-col gap-2 w-full">
      <button className="btn btn-ghost border-1 border-base-content flex gap-1">
        <img
          className="h-8"
          src="/src/presentation/assets/google-icon.svg"
          alt="Google-Icon"
        />
        Login with Google
      </button>
      <button className="btn btn-ghost border-1 border-base-content flex gap-1">
        <img
          className="h-8"
          src="/src/presentation/assets/facebook-icon.svg"
          alt="Facebook-Icon"
        />
        Login with Facebook
      </button>
    </div>
  );
}
