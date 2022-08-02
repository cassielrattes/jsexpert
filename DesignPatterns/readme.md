# DRY - DON'T REPEAT YOURSELF

# KISS - KEEP IT SIMPLE STUPID

# YAGNI - YOU AREN'T GONNA NEED IT

# CLEAN CODE

```
Especificar uma convenção entre desenvolvedores
```

# SOLID

```
S - SINGLE RESPONSABILITY PRINCIPLE

Um modulo deve haver uma e apenas uma razão para mudar,
quando uma classe faz mas do que seu proposito significa que suas
responsabilidades devem ser revistas e divididas em novas classes.

O - OPEN CLOSED PRINCIPLE

Entidade sistema devem ser abertas para extensão e fechadas
para modificação. Podemos adicionar um valor sem alterar o que
já existe no software.

L - LISKOV SUBSTITUTION PRINCIPLE

As classes filhas podem herdar o comportamento da classe base
e sobrescrever um metodo da classe pai se necessario.

I - INTERFACE SEGREGATION PRINCIPLE

São contratos o que uma classe deve ter. Clientes
não devem ser forçados a ser dependente de uma classe que
eles não usam.

D - DEPENDENCY INVERSION PRINCIPLE

As dependencias de nossas classes devem depender
de abstrações ao inves de implementações. Não deveriamos saber
qualquer detalhes de implementação de nossas dependencias.

```

# FACTORY

```

Serve para abstrair a complexidade da criação de um objeto
e evitar a replicação de dependencias.

```

# N-TIER, N-LAYERS OU N-CAMADAS

```

Usada para dividir responsabilidades da arquitetura do seu
sistema. Se dividindo em: Acesso a dados, Regras de negócios e Exposição de instâncias.

> Repository: É um padrão de acesso a dados e qualquer acesso
a dados de um dominio especifico deve ser feito por uma classe
especifica de acordo com o seu contexto.

> Service ou Business: Fica responsavel por mapear os dados, fazer calculos e
tomar decisões.

> Dependency Injection: Service -> Depende -> Repository -> Depende -> Driver de Banco


```
