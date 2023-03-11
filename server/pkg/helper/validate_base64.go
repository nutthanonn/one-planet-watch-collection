package helper

import "regexp"

func ValidateBase64(str string) bool {
	pattern := regexp.MustCompile(`^data:image\/(png|jpg|jpeg);base64,[A-Za-z0-9+/]+={0,2}$`)
	return pattern.MatchString(str)
}
