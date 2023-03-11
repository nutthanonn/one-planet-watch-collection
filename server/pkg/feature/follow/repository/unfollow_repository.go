package repository

import (
	"context"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func (fr *followRepository) UnFollow(followerID string, followingID string) error {
	user_collection := fr.mongo_database.Collection("users")
	follower_objectID, err := primitive.ObjectIDFromHex(followerID)
	if err != nil {
		return err
	}

	following_objectID, err := primitive.ObjectIDFromHex(followingID)
	if err != nil {
		return err
	}

	follower_filter := bson.M{"_id": follower_objectID}
	following_filter := bson.M{"_id": following_objectID}

	follower_update := bson.M{"$pull": bson.M{"following": following_objectID}}
	following_update := bson.M{"$pull": bson.M{"follower": follower_objectID}}

	session, err := fr.mongo_database.Client().StartSession()
	if err != nil {
		return err
	}
	defer session.EndSession(context.Background())

	err = session.StartTransaction()
	if err != nil {
		return err
	}

	if _, err = user_collection.UpdateOne(context.TODO(), follower_filter, follower_update); err != nil {
		session.AbortTransaction(context.Background())
		return err
	}

	if _, err = user_collection.UpdateOne(context.TODO(), following_filter, following_update); err != nil {
		session.AbortTransaction(context.Background())
		return err
	}

	if err = session.CommitTransaction(context.Background()); err != nil {
		return err
	}

	return nil
}
