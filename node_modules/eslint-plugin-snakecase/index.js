function isClassUsage(node) {
  return ['FunctionDeclaration', 'NewExpression', 'MemberExpression'].indexOf(node.parent.type) > -1;
}

module.exports = {
  rules: {
    snakecase: {
      meta: {
        fixable: true,
      },
      create(context) {
        return {
          Identifier(node) {
            var name = node.name;
            var split = name.split(/(?=[A-Z])/);
            if (split.length > 1) {
              if (isClassUsage(node)) {
                return true;
              }
              // this has some uppercase letters
              context.report({
                message: 'Identifiers must be snake case: {{ identifier }}',
                node: node,
                data: {
                  identifier: node.name,
                },
                // fix(fixer) {
                //   return fixer.replaceText(node, split.map(function(piece){ return piece.replace('_', '').toLowerCase(); }).join('_'));
                // }
              })
            }
          }
        }
      }
    }
  }
}