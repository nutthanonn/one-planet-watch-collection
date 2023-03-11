package helper

import "golang.org/x/crypto/bcrypt"

func Compare(comp, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(comp))
	return err == nil
}
