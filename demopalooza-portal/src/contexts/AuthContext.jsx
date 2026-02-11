import { createContext, useContext, useState, useEffect } from 'react';
import { mockUsers, mockOrganizations } from '../mocks/auth';

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [currentOrg, setCurrentOrg] = useState(null);
  const [userOrgs, setUserOrgs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate checking for existing session
    const savedSession = localStorage.getItem('demopalooza-session');
    if (savedSession) {
      const session = JSON.parse(savedSession);
      const foundUser = mockUsers.find((u) => u.id === session.userId);
      if (foundUser) {
        setUser(foundUser);
        const orgs = mockOrganizations.filter((o) =>
          foundUser.organizationIds.includes(o.id)
        );
        setUserOrgs(orgs);
        setCurrentOrg(orgs.find((o) => o.id === session.orgId) || orgs[0]);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    // Mock login - in real app, this would call viax GraphQL
    const foundUser = mockUsers.find(
      (u) => u.email === email && u.password === password
    );
    if (!foundUser) {
      throw new Error('Invalid credentials');
    }

    const orgs = mockOrganizations.filter((o) =>
      foundUser.organizationIds.includes(o.id)
    );

    setUser(foundUser);
    setUserOrgs(orgs);
    setCurrentOrg(orgs[0]);

    localStorage.setItem(
      'demopalooza-session',
      JSON.stringify({ userId: foundUser.id, orgId: orgs[0].id })
    );

    return foundUser;
  };

  const logout = () => {
    setUser(null);
    setCurrentOrg(null);
    setUserOrgs([]);
    localStorage.removeItem('demopalooza-session');
  };

  const switchOrganization = (orgId) => {
    const org = userOrgs.find((o) => o.id === orgId);
    if (org) {
      setCurrentOrg(org);
      const session = JSON.parse(localStorage.getItem('demopalooza-session') || '{}');
      localStorage.setItem(
        'demopalooza-session',
        JSON.stringify({ ...session, orgId })
      );
    }
  };

  const hasPermission = (permission) => {
    if (!user || !currentOrg) return false;
    const membership = user.memberships?.find((m) => m.orgId === currentOrg.id);
    return membership?.permissions?.includes(permission) || membership?.role === 'super_admin';
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        currentOrg,
        userOrgs,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
        switchOrganization,
        hasPermission,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
