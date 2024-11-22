#1. Check if a number is even or odd
n = int(input())
if n % 2 == 0:
    print("even")
else:
    print("odd")
#2. Sum of two numbers
a = int(input())
b = int(input())
print(a + b)

# 3. Bubble Sort an array
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n-i-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
    return arr

arr = list(map(int, input().split()))
sorted_arr = bubble_sort(arr)
print(sorted_arr)

# 4. Basic Calculator
a = int(input())
b = int(input())
operator = input()

if operator == '+':
    print(a + b)
elif operator == '-':
    print(a - b)
elif operator == '*':
    print(a * b)
elif operator == '/':
    if b == 0:
        print("Division by zero is undefined")
    else:
        print(a / b)
elif operator == '**':
    print(a ** b)
else:
    print("Invalid operator")

# 5. Count the number of vowels in a string
vowels = "aeiouAEIOU"
s = input()
count = sum(1 for char in s if char in vowels)
print(count)


# 6. Sort the characters of a string
s = input()
sorted_s = ''.join(sorted(s))
print(sorted_s)


# 7. Remove duplicate characters from a string
s = input()
unique_chars = ''.join(sorted(set(s), key=s.index))
print(unique_chars)

# 8. List unique characters with their count in a string
s = input()
char_count = {}
for char in s:
    if char in char_count:
        char_count[char] += 1
    else:
        char_count[char] = 1
print(char_count)

# 9. Find unique words in a string
s = input()
words = s.split()
unique_words = list(dict.fromkeys(words))  # Removes duplicates while preserving order
print(unique_words)


# 10. Basic inventory management (add, remove, and check stock levels)
inventory = {}

def add_item(item, quantity):
    if item in inventory:
        inventory[item] += quantity
    else:
        inventory[item] = quantity

def remove_item(item, quantity):
    if item in inventory and inventory[item] >= quantity:
        inventory[item] -= quantity
    else:
        print("Not enough stock")

def check_stock(item):
    return inventory.get(item, 0)

n = int(input("Enter number of operations: "))
for _ in range(n):
    operation = input().split()
    if operation[0] == "add":
        item = operation[1]
        quantity = int(operation[2])
        add_item(item, quantity)
    elif operation[0] == "remove":
        item = operation[1]
        quantity = int(operation[2])
        remove_item(item, quantity)
    elif operation[0] == "check":
        item = operation[1]
        print(check_stock(item))
