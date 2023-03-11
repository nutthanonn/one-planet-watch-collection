package helper

import "regexp"

func ValidateUsername(username string) bool {
	regex := regexp.MustCompile(`^[a-zA-Z0-9._]{1,30}$`)
	return regex.MatchString(username) && len(username) >= 6 && len(username) <= 20
}
