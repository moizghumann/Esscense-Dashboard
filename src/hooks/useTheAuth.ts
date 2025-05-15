import { useUser, useAuth, useSignIn } from '@clerk/clerk-react';

export const useTheAuth = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const { signOut } = useAuth();
  const { signIn } = useSignIn();
  
  return {
    user: isSignedIn ? {
      id: user.id,
      email: user.emailAddresses[0].emailAddress,
      name: user.fullName,
      avatar: user.imageUrl,
      role: 'admin' // Set based on your requirements
    } : null,
    isAuthenticated: isSignedIn,
    isInitialized: isLoaded,
    method: 'CLERK',
    signInWithEmail: (email: string, password: string) => 
      signIn?.create({ identifier: email, password }),
    signInWithGoogle: () => signIn?.authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrl: "/dashboard",
      redirectUrlComplete: "/dashboard"
    }),
    logout: () => signOut()
  };
};