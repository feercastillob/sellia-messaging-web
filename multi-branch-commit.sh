#!/bin/bash
# Uso: ./multi-branch-commit.sh feature "mensaje del commit"
BRANCH=$1
MESSAGE=$2

if [ -z "$BRANCH" ] || [ -z "$MESSAGE" ]; then
  echo "Uso: ./multi-branch-commit.sh <rama> \"mensaje del commit\""
  exit 1
fi

# Crea la worktree si no existe
if [ ! -d "../$BRANCH" ]; then
  echo "🔧 Creando worktree para la rama '$BRANCH'..."
  git worktree add "../$BRANCH" "$BRANCH" || exit 1
fi

# Copia los cambios actuales a la worktree (sin perderlos)
echo "📦 Copiando cambios a ../$BRANCH..."
rsync -a --exclude='.git' . "../$BRANCH"

# Hace commit en la rama destino
cd "../$BRANCH" || exit
git add .
git commit -m "$MESSAGE"

echo "✅ Commit hecho en rama '$BRANCH'"
