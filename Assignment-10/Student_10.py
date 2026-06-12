class Address:
    def __init__(self, street, city, zip_code):
        self.street = street
        self.city = city
        self.zip_code = zip_code

    def __str__(self):
        return f"{self.street}, {self.city} - {self.zip_code}"


class Student:
    def __init__(self, name, age, address):
        self.name = name
        self.age = age
        self.address = address
        self.courses = []

    def add_course(self, course):
        self.courses.append(course)

    def display(self):
        print("Name    : " + self.name)
        print("Age     : " + str(self.age))
        print("Address : " + str(self.address))
        print("Courses : " + (str(self.courses) if self.courses else "None"))


class ScholarshipStudent(Student):
    def __init__(self, name, age, address, scholarship_amount):
        super().__init__(name, age, address)
        self.scholarship_amount = scholarship_amount

    def display(self):
        super().display()
        print("Scholarship : " + str(self.scholarship_amount))


addr1 = Address("12 MG Road", "Tezpur", "784001")
s1 = Student("Alice", 20, addr1)
s1.add_course("Data Structures")
s1.add_course("DBMS")
s1.display()


print("\n")
print("=======================================")
print("\n")

addr2 = Address("45 NH-15", "Guwahati", "781001")
s2 = ScholarshipStudent("Bob", 21, addr2, 50000)
s2.add_course("Machine Learning")
s2.display()