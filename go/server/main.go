package main

import (
	"context"
	"flag"
	"fmt"
	"log"
	"net"

	"github.com/r04922101/go-grpc-error/pb"

	"google.golang.org/grpc"

	"google.golang.org/genproto/googleapis/rpc/errdetails"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

var (
	port = flag.Int("port", 3000, "server port")
)

type server struct {
}

func (s *server) SayHello(ctx context.Context, req *pb.HelloRequest) (*pb.HelloResponse, error) {
	msg := req.GetMessage()
	log.Printf("Received a hello message: %s", msg)
	if msg == "give me an error" {
		s, _ := status.New(codes.Internal, "error message for client").WithDetails(
			&errdetails.ErrorInfo{
				Reason: "error detail error info: error occurs as client requested",
			},
			&errdetails.BadRequest{
				FieldViolations: []*errdetails.BadRequest_FieldViolation{
					{
						Field:       "error detail bad request: bad request field",
						Description: "error detail bad request: bad request field description",
					},
				},
			})
		return nil, s.Err()
	}
	return &pb.HelloResponse{Message: "Hello, World"}, nil
}

func main() {
	flag.Parse()

	lis, err := net.Listen("tcp", fmt.Sprintf("localhost:%d", *port))
	if err != nil {
		log.Fatalf("failed to listen at port %d: %v", *port, err)
	}

	s := grpc.NewServer()
	pb.RegisterHelloWorldServer(s, &server{})
	log.Printf("server listening at %v", lis.Addr())

	if err := s.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}
