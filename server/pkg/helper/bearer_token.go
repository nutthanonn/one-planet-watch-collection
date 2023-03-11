package helper

import (
	"errors"
	"strings"
)

func BearerToken(authHeader string) (*string, error) {
	if authHeader == "" {
		return nil, errors.New("authorization header is required")
	}

	authParts := strings.Split(authHeader, " ")
	if len(authParts) != 2 {

		return nil, errors.New("invalid Authorization header")
	}

	if authParts[0] != "Bearer" {
		return nil, errors.New("invalid token type")
	}

	return &authParts[1], nil
}
