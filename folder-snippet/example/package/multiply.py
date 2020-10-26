from .add import Add

def Multiply(n1, n2):
  total = 0
  for i in range(n1):
    total = Add(total, n2)
  return total