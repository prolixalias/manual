# Host PATH wrappers land in front of Nix.
# Re-assert Devbox bins after the shell has finished initializing.
export PATH="${DEVBOX_PACKAGES_DIR:-$PWD/.devbox/nix/profile/default}/bin:${DEVBOX_COREPACK_BIN_DIR:-$PWD/.devbox/virtenv/nodejs/corepack-bin}:$PATH"
hash -r 2>/dev/null || rehash 2>/dev/null || true

export PLAYWRIGHT_SKIP_VALIDATE_HOST_REQUIREMENTS=true
if command -v playwright >/dev/null 2>&1; then
  _pw=$(readlink -f "$(command -v playwright)" 2>/dev/null || true)
  if [ -n "$_pw" ]; then
    _pw_root=$(dirname "$(dirname "$_pw")")
    export NODE_PATH="${_pw_root}/lib/node_modules${NODE_PATH:+:$NODE_PATH}"
    _browsers=$(sed -n "s/.*PLAYWRIGHT_BROWSERS_PATH=\${PLAYWRIGHT_BROWSERS_PATH-'\([^']*\)'}.*/\1/p" "$_pw")
    if [ -n "$_browsers" ]; then
      export PLAYWRIGHT_BROWSERS_PATH="${PLAYWRIGHT_BROWSERS_PATH:-$_browsers}"
    fi
  fi
  unset _pw _pw_root _browsers
fi
