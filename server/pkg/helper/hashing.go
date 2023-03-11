package helper

import "golang.org/x/crypto/bcrypt"

func Hashing(str string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(str), 14)
	return string(bytes), err
}
