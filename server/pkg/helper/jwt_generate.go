package helper

import (
	"fmt"
	"time"

	"github.com/golang-jwt/jwt/v4"
)

func GenerateToken(expirationTime time.Duration, userId, email, username string) (string, error) {
	// Create a new token object
	token := jwt.New(jwt.SigningMethodHS256)

	// Set the claims
	claims := token.Claims.(jwt.MapClaims)
	claims["sub"] = userId
	claims["email"] = email
	claims["name"] = username
	claims["iat"] = time.Now().Unix()
	claims["exp"] = time.Now().Add(expirationTime).Unix()

	// Generate the signed token
	tokenString, err := token.SignedString([]byte(GetENV("JWT_SECRET")))
	if err != nil {
		return "", fmt.Errorf("error generating token: %v", err)
	}

	return tokenString, nil
}
