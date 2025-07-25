# Auth

same kind of apis but reusable, functions like this should be generated using fecade pattern

```ts
import { hasPermission } from "@/features/authentication/attribute-base-access-control/attributeBaseAccessControl";
import { getUser } from "@/features/authentication/services/getUser";
import type { User } from "@/features/authentication/types/AuthUserTypes";
import { redirect } from "next/navigation";

type getUserAndValidateAccessParams = {
  onSuccess?: ({ user }: { user: User }) => void;
  onError?: () => void;
  onNoPermissionError?: ({ user }: { user: User }) => void;
  accessFor: {
    resource: Parameters<typeof hasPermission>[1];
    action: Parameters<typeof hasPermission>[2];
  };
};

/**
 * Retrieves the current user and validates their access to the admin page.
 */
export async function getUserAndValidateAccess({
  onSuccess,
  onError,
  onNoPermissionError,
  accessFor,
}: getUserAndValidateAccessParams) {
  const user = await getUser({});

  // redirect if user is undefined
  if (!user?.success) {
    if (onError) onError();
    return redirect("/login");
  }

  // redirect if user doesn't have permission to access admin page
  const { action, resource } = accessFor;
  if (!hasPermission(user.data, resource, action)) {
    if (onNoPermissionError) onNoPermissionError({ user: user.data });
    return redirect("/");
  }

  // call onSuccess callback if user has permission
  if (onSuccess) onSuccess({ user: user.data });
  // return user
  return user.data;
}
```

## attribute base access control

```ts
/**
 * Attribute base access control
 * this happens on the client side and this doesn't protect the apis only prevent access from ui
 * @see https://www.youtube.com/watch?v=5GG-VUvruzE
 * @see https://github.com/WebDevSimplified/permission-system/blob/main/auth-abac.ts
 */

import type { User } from "@/features/authentication/types/AuthUserTypes";

type Role = User["role"];
type PermissionCheck<Key extends keyof Permissions> =
  | boolean
  // Type '"dataType"' cannot be used to index type 'Permissions[Key]'
  | ((user: User, data: Permissions[Key]["dataType"]) => boolean);

type RolesWithPermissions = {
  [R in Role]: Partial<{
    [Key in keyof Permissions]: Partial<{
      [Action in Permissions[Key]["action"]]: PermissionCheck<Key>;
    }>;
  }>;
};

/**
 * be careful a typo like writing dataType dat`e`Type can lead to errors
 */
type Permissions = {
  adminPage: {
    dataType: null;
    action: "view";
  };

  dashboardPage: {
    dataType: null;
    action: "view";
  };
};

const ROLES = {
  admin: {
    adminPage: {
      view: true,
    },

    dashboardPage: {
      view: true,
    },
  },

  user: {
    adminPage: {
      view: false,
    },

    dashboardPage: {
      view: true,
    },
  },
} as const satisfies RolesWithPermissions;

/**
 * Checks if the user has the specified permission for the given resource and action.
 * uses Attribute based access control pattern
 *
 * @param user - The user object.
 * @param resource - The resource for which the permission is being checked.
 * @param action - The action for which the permission is being checked.
 * @param data - Optional data associated with the resource and action.
 * @returns `true` if the user has the specified permission, `false` otherwise.
 */
export function hasPermission<Resource extends keyof Permissions>(
  user: User,
  resource: Resource,
  action: Permissions[Resource]["action"],
  data?: Permissions[Resource]["dataType"],
) {
  const permission = (ROLES as RolesWithPermissions)[user.role][resource]?.[
    action
  ];
  if (permission == null) return false;

  if (typeof permission === "boolean") return permission;
  return data != null && permission(user, data);
}
```
