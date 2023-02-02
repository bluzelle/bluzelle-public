// Code generated by protoc-gen-gogo. DO NOT EDIT.
// source: storage/query.proto

package types

import (
	context "context"
	fmt "fmt"
	_ "github.com/cosmos/cosmos-sdk/types/query"
	grpc1 "github.com/gogo/protobuf/grpc"
	proto "github.com/gogo/protobuf/proto"
	_ "google.golang.org/genproto/googleapis/api/annotations"
	grpc "google.golang.org/grpc"
	codes "google.golang.org/grpc/codes"
	status "google.golang.org/grpc/status"
	io "io"
	math "math"
	math_bits "math/bits"
)

// Reference imports to suppress errors if they are not otherwise used.
var _ = proto.Marshal
var _ = fmt.Errorf
var _ = math.Inf

// This is a compile-time assertion to ensure that this generated file
// is compatible with the proto package it is being compiled against.
// A compilation error at this line likely means your copy of the
// proto package needs to be updated.
const _ = proto.GoGoProtoPackageIsVersion3 // please upgrade the proto package

type QueryHasContentRequest struct {
	Cid string `protobuf:"bytes,1,opt,name=cid,proto3" json:"cid,omitempty"`
}

func (m *QueryHasContentRequest) Reset()         { *m = QueryHasContentRequest{} }
func (m *QueryHasContentRequest) String() string { return proto.CompactTextString(m) }
func (*QueryHasContentRequest) ProtoMessage()    {}
func (*QueryHasContentRequest) Descriptor() ([]byte, []int) {
	return fileDescriptor_4e8535c98d6a78f2, []int{0}
}
func (m *QueryHasContentRequest) XXX_Unmarshal(b []byte) error {
	return m.Unmarshal(b)
}
func (m *QueryHasContentRequest) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	if deterministic {
		return xxx_messageInfo_QueryHasContentRequest.Marshal(b, m, deterministic)
	} else {
		b = b[:cap(b)]
		n, err := m.MarshalToSizedBuffer(b)
		if err != nil {
			return nil, err
		}
		return b[:n], nil
	}
}
func (m *QueryHasContentRequest) XXX_Merge(src proto.Message) {
	xxx_messageInfo_QueryHasContentRequest.Merge(m, src)
}
func (m *QueryHasContentRequest) XXX_Size() int {
	return m.Size()
}
func (m *QueryHasContentRequest) XXX_DiscardUnknown() {
	xxx_messageInfo_QueryHasContentRequest.DiscardUnknown(m)
}

var xxx_messageInfo_QueryHasContentRequest proto.InternalMessageInfo

func (m *QueryHasContentRequest) GetCid() string {
	if m != nil {
		return m.Cid
	}
	return ""
}

type QueryHasContentResponse struct {
	HasContent bool `protobuf:"varint,1,opt,name=hasContent,proto3" json:"hasContent,omitempty"`
}

func (m *QueryHasContentResponse) Reset()         { *m = QueryHasContentResponse{} }
func (m *QueryHasContentResponse) String() string { return proto.CompactTextString(m) }
func (*QueryHasContentResponse) ProtoMessage()    {}
func (*QueryHasContentResponse) Descriptor() ([]byte, []int) {
	return fileDescriptor_4e8535c98d6a78f2, []int{1}
}
func (m *QueryHasContentResponse) XXX_Unmarshal(b []byte) error {
	return m.Unmarshal(b)
}
func (m *QueryHasContentResponse) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	if deterministic {
		return xxx_messageInfo_QueryHasContentResponse.Marshal(b, m, deterministic)
	} else {
		b = b[:cap(b)]
		n, err := m.MarshalToSizedBuffer(b)
		if err != nil {
			return nil, err
		}
		return b[:n], nil
	}
}
func (m *QueryHasContentResponse) XXX_Merge(src proto.Message) {
	xxx_messageInfo_QueryHasContentResponse.Merge(m, src)
}
func (m *QueryHasContentResponse) XXX_Size() int {
	return m.Size()
}
func (m *QueryHasContentResponse) XXX_DiscardUnknown() {
	xxx_messageInfo_QueryHasContentResponse.DiscardUnknown(m)
}

var xxx_messageInfo_QueryHasContentResponse proto.InternalMessageInfo

func (m *QueryHasContentResponse) GetHasContent() bool {
	if m != nil {
		return m.HasContent
	}
	return false
}

func init() {
	proto.RegisterType((*QueryHasContentRequest)(nil), "bluzelle.curium.storage.QueryHasContentRequest")
	proto.RegisterType((*QueryHasContentResponse)(nil), "bluzelle.curium.storage.QueryHasContentResponse")
}

func init() { proto.RegisterFile("storage/query.proto", fileDescriptor_4e8535c98d6a78f2) }

var fileDescriptor_4e8535c98d6a78f2 = []byte{
	// 302 bytes of a gzipped FileDescriptorProto
	0x1f, 0x8b, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0xff, 0x8c, 0x90, 0x31, 0x4b, 0x03, 0x31,
	0x14, 0xc7, 0x1b, 0x45, 0xd1, 0x4c, 0x12, 0xc1, 0x4a, 0x91, 0x20, 0x15, 0x41, 0x2a, 0x26, 0x56,
	0x27, 0x1d, 0x75, 0x71, 0xb5, 0x38, 0xb9, 0x25, 0x67, 0xb8, 0x06, 0xee, 0xf2, 0xd2, 0x4b, 0x22,
	0xd6, 0xd1, 0x4f, 0x20, 0xb8, 0x3a, 0xfb, 0x59, 0x1c, 0x0b, 0x2e, 0x8e, 0x72, 0xe7, 0x07, 0x91,
	0xde, 0xf5, 0x7a, 0x82, 0x0a, 0x6e, 0x8f, 0xc7, 0xff, 0xf7, 0xe3, 0xff, 0x1e, 0x5e, 0x77, 0x1e,
	0x32, 0x11, 0x2b, 0x3e, 0x0a, 0x2a, 0x1b, 0x33, 0x9b, 0x81, 0x07, 0xd2, 0x96, 0x49, 0xb8, 0x57,
	0x49, 0xa2, 0x58, 0x14, 0x32, 0x1d, 0x52, 0x36, 0x0b, 0x75, 0xb6, 0x62, 0x80, 0x38, 0x51, 0x5c,
	0x58, 0xcd, 0x85, 0x31, 0xe0, 0x85, 0xd7, 0x60, 0x5c, 0x85, 0x75, 0x7a, 0x11, 0xb8, 0x14, 0x1c,
	0x97, 0xc2, 0xcd, 0x7c, 0xfc, 0xb6, 0x2f, 0x95, 0x17, 0x7d, 0x6e, 0x45, 0xac, 0x4d, 0x19, 0xae,
	0xb2, 0xdd, 0x1e, 0xde, 0xb8, 0x9c, 0x26, 0x2e, 0x84, 0x3b, 0x07, 0xe3, 0x95, 0xf1, 0x03, 0x35,
	0x0a, 0xca, 0x79, 0xb2, 0x86, 0x17, 0x23, 0x7d, 0xb3, 0x89, 0xb6, 0xd1, 0xde, 0xea, 0x60, 0x3a,
	0x76, 0x4f, 0x70, 0xfb, 0x47, 0xd6, 0x59, 0x30, 0x4e, 0x11, 0x8a, 0xf1, 0x70, 0xbe, 0x2d, 0x99,
	0x95, 0xc1, 0xb7, 0xcd, 0xd1, 0x0b, 0xc2, 0x4b, 0x25, 0x4b, 0x9e, 0x11, 0xc6, 0x8d, 0x80, 0x70,
	0xf6, 0xc7, 0x8d, 0xec, 0xf7, 0x5a, 0x9d, 0xc3, 0xff, 0x03, 0x55, 0xb7, 0xee, 0xfe, 0xc3, 0xdb,
	0xe7, 0xd3, 0xc2, 0x2e, 0xd9, 0xe1, 0x35, 0xc9, 0x2b, 0x92, 0xd7, 0x3f, 0x6f, 0x8a, 0x9e, 0x5d,
	0xbd, 0xe6, 0x14, 0x4d, 0x72, 0x8a, 0x3e, 0x72, 0x8a, 0x1e, 0x0b, 0xda, 0x9a, 0x14, 0xb4, 0xf5,
	0x5e, 0xd0, 0xd6, 0xf5, 0x69, 0xac, 0xfd, 0x30, 0x48, 0x16, 0x41, 0xda, 0x88, 0xea, 0xe1, 0xc0,
	0x06, 0x99, 0xe8, 0xa8, 0x16, 0xdf, 0xcd, 0xd5, 0x7e, 0x6c, 0x95, 0x93, 0xcb, 0xe5, 0xb3, 0x8f,
	0xbf, 0x02, 0x00, 0x00, 0xff, 0xff, 0x9f, 0x6a, 0x08, 0x76, 0xe6, 0x01, 0x00, 0x00,
}

// Reference imports to suppress errors if they are not otherwise used.
var _ context.Context
var _ grpc.ClientConn

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
const _ = grpc.SupportPackageIsVersion4

// QueryClient is the client API for Query service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://godoc.org/google.golang.org/grpc#ClientConn.NewStream.
type QueryClient interface {
	HasContent(ctx context.Context, in *QueryHasContentRequest, opts ...grpc.CallOption) (*QueryHasContentResponse, error)
}

type queryClient struct {
	cc grpc1.ClientConn
}

func NewQueryClient(cc grpc1.ClientConn) QueryClient {
	return &queryClient{cc}
}

func (c *queryClient) HasContent(ctx context.Context, in *QueryHasContentRequest, opts ...grpc.CallOption) (*QueryHasContentResponse, error) {
	out := new(QueryHasContentResponse)
	err := c.cc.Invoke(ctx, "/bluzelle.curium.storage.Query/HasContent", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// QueryServer is the server API for Query service.
type QueryServer interface {
	HasContent(context.Context, *QueryHasContentRequest) (*QueryHasContentResponse, error)
}

// UnimplementedQueryServer can be embedded to have forward compatible implementations.
type UnimplementedQueryServer struct {
}

func (*UnimplementedQueryServer) HasContent(ctx context.Context, req *QueryHasContentRequest) (*QueryHasContentResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method HasContent not implemented")
}

func RegisterQueryServer(s grpc1.Server, srv QueryServer) {
	s.RegisterService(&_Query_serviceDesc, srv)
}

func _Query_HasContent_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(QueryHasContentRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(QueryServer).HasContent(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/bluzelle.curium.storage.Query/HasContent",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(QueryServer).HasContent(ctx, req.(*QueryHasContentRequest))
	}
	return interceptor(ctx, in, info, handler)
}

var _Query_serviceDesc = grpc.ServiceDesc{
	ServiceName: "bluzelle.curium.storage.Query",
	HandlerType: (*QueryServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "HasContent",
			Handler:    _Query_HasContent_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "storage/query.proto",
}

func (m *QueryHasContentRequest) Marshal() (dAtA []byte, err error) {
	size := m.Size()
	dAtA = make([]byte, size)
	n, err := m.MarshalToSizedBuffer(dAtA[:size])
	if err != nil {
		return nil, err
	}
	return dAtA[:n], nil
}

func (m *QueryHasContentRequest) MarshalTo(dAtA []byte) (int, error) {
	size := m.Size()
	return m.MarshalToSizedBuffer(dAtA[:size])
}

func (m *QueryHasContentRequest) MarshalToSizedBuffer(dAtA []byte) (int, error) {
	i := len(dAtA)
	_ = i
	var l int
	_ = l
	if len(m.Cid) > 0 {
		i -= len(m.Cid)
		copy(dAtA[i:], m.Cid)
		i = encodeVarintQuery(dAtA, i, uint64(len(m.Cid)))
		i--
		dAtA[i] = 0xa
	}
	return len(dAtA) - i, nil
}

func (m *QueryHasContentResponse) Marshal() (dAtA []byte, err error) {
	size := m.Size()
	dAtA = make([]byte, size)
	n, err := m.MarshalToSizedBuffer(dAtA[:size])
	if err != nil {
		return nil, err
	}
	return dAtA[:n], nil
}

func (m *QueryHasContentResponse) MarshalTo(dAtA []byte) (int, error) {
	size := m.Size()
	return m.MarshalToSizedBuffer(dAtA[:size])
}

func (m *QueryHasContentResponse) MarshalToSizedBuffer(dAtA []byte) (int, error) {
	i := len(dAtA)
	_ = i
	var l int
	_ = l
	if m.HasContent {
		i--
		if m.HasContent {
			dAtA[i] = 1
		} else {
			dAtA[i] = 0
		}
		i--
		dAtA[i] = 0x8
	}
	return len(dAtA) - i, nil
}

func encodeVarintQuery(dAtA []byte, offset int, v uint64) int {
	offset -= sovQuery(v)
	base := offset
	for v >= 1<<7 {
		dAtA[offset] = uint8(v&0x7f | 0x80)
		v >>= 7
		offset++
	}
	dAtA[offset] = uint8(v)
	return base
}
func (m *QueryHasContentRequest) Size() (n int) {
	if m == nil {
		return 0
	}
	var l int
	_ = l
	l = len(m.Cid)
	if l > 0 {
		n += 1 + l + sovQuery(uint64(l))
	}
	return n
}

func (m *QueryHasContentResponse) Size() (n int) {
	if m == nil {
		return 0
	}
	var l int
	_ = l
	if m.HasContent {
		n += 2
	}
	return n
}

func sovQuery(x uint64) (n int) {
	return (math_bits.Len64(x|1) + 6) / 7
}
func sozQuery(x uint64) (n int) {
	return sovQuery(uint64((x << 1) ^ uint64((int64(x) >> 63))))
}
func (m *QueryHasContentRequest) Unmarshal(dAtA []byte) error {
	l := len(dAtA)
	iNdEx := 0
	for iNdEx < l {
		preIndex := iNdEx
		var wire uint64
		for shift := uint(0); ; shift += 7 {
			if shift >= 64 {
				return ErrIntOverflowQuery
			}
			if iNdEx >= l {
				return io.ErrUnexpectedEOF
			}
			b := dAtA[iNdEx]
			iNdEx++
			wire |= uint64(b&0x7F) << shift
			if b < 0x80 {
				break
			}
		}
		fieldNum := int32(wire >> 3)
		wireType := int(wire & 0x7)
		if wireType == 4 {
			return fmt.Errorf("proto: QueryHasContentRequest: wiretype end group for non-group")
		}
		if fieldNum <= 0 {
			return fmt.Errorf("proto: QueryHasContentRequest: illegal tag %d (wire type %d)", fieldNum, wire)
		}
		switch fieldNum {
		case 1:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field Cid", wireType)
			}
			var stringLen uint64
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowQuery
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				stringLen |= uint64(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
			intStringLen := int(stringLen)
			if intStringLen < 0 {
				return ErrInvalidLengthQuery
			}
			postIndex := iNdEx + intStringLen
			if postIndex < 0 {
				return ErrInvalidLengthQuery
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.Cid = string(dAtA[iNdEx:postIndex])
			iNdEx = postIndex
		default:
			iNdEx = preIndex
			skippy, err := skipQuery(dAtA[iNdEx:])
			if err != nil {
				return err
			}
			if (skippy < 0) || (iNdEx+skippy) < 0 {
				return ErrInvalidLengthQuery
			}
			if (iNdEx + skippy) > l {
				return io.ErrUnexpectedEOF
			}
			iNdEx += skippy
		}
	}

	if iNdEx > l {
		return io.ErrUnexpectedEOF
	}
	return nil
}
func (m *QueryHasContentResponse) Unmarshal(dAtA []byte) error {
	l := len(dAtA)
	iNdEx := 0
	for iNdEx < l {
		preIndex := iNdEx
		var wire uint64
		for shift := uint(0); ; shift += 7 {
			if shift >= 64 {
				return ErrIntOverflowQuery
			}
			if iNdEx >= l {
				return io.ErrUnexpectedEOF
			}
			b := dAtA[iNdEx]
			iNdEx++
			wire |= uint64(b&0x7F) << shift
			if b < 0x80 {
				break
			}
		}
		fieldNum := int32(wire >> 3)
		wireType := int(wire & 0x7)
		if wireType == 4 {
			return fmt.Errorf("proto: QueryHasContentResponse: wiretype end group for non-group")
		}
		if fieldNum <= 0 {
			return fmt.Errorf("proto: QueryHasContentResponse: illegal tag %d (wire type %d)", fieldNum, wire)
		}
		switch fieldNum {
		case 1:
			if wireType != 0 {
				return fmt.Errorf("proto: wrong wireType = %d for field HasContent", wireType)
			}
			var v int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowQuery
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				v |= int(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
			m.HasContent = bool(v != 0)
		default:
			iNdEx = preIndex
			skippy, err := skipQuery(dAtA[iNdEx:])
			if err != nil {
				return err
			}
			if (skippy < 0) || (iNdEx+skippy) < 0 {
				return ErrInvalidLengthQuery
			}
			if (iNdEx + skippy) > l {
				return io.ErrUnexpectedEOF
			}
			iNdEx += skippy
		}
	}

	if iNdEx > l {
		return io.ErrUnexpectedEOF
	}
	return nil
}
func skipQuery(dAtA []byte) (n int, err error) {
	l := len(dAtA)
	iNdEx := 0
	depth := 0
	for iNdEx < l {
		var wire uint64
		for shift := uint(0); ; shift += 7 {
			if shift >= 64 {
				return 0, ErrIntOverflowQuery
			}
			if iNdEx >= l {
				return 0, io.ErrUnexpectedEOF
			}
			b := dAtA[iNdEx]
			iNdEx++
			wire |= (uint64(b) & 0x7F) << shift
			if b < 0x80 {
				break
			}
		}
		wireType := int(wire & 0x7)
		switch wireType {
		case 0:
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return 0, ErrIntOverflowQuery
				}
				if iNdEx >= l {
					return 0, io.ErrUnexpectedEOF
				}
				iNdEx++
				if dAtA[iNdEx-1] < 0x80 {
					break
				}
			}
		case 1:
			iNdEx += 8
		case 2:
			var length int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return 0, ErrIntOverflowQuery
				}
				if iNdEx >= l {
					return 0, io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				length |= (int(b) & 0x7F) << shift
				if b < 0x80 {
					break
				}
			}
			if length < 0 {
				return 0, ErrInvalidLengthQuery
			}
			iNdEx += length
		case 3:
			depth++
		case 4:
			if depth == 0 {
				return 0, ErrUnexpectedEndOfGroupQuery
			}
			depth--
		case 5:
			iNdEx += 4
		default:
			return 0, fmt.Errorf("proto: illegal wireType %d", wireType)
		}
		if iNdEx < 0 {
			return 0, ErrInvalidLengthQuery
		}
		if depth == 0 {
			return iNdEx, nil
		}
	}
	return 0, io.ErrUnexpectedEOF
}

var (
	ErrInvalidLengthQuery        = fmt.Errorf("proto: negative length found during unmarshaling")
	ErrIntOverflowQuery          = fmt.Errorf("proto: integer overflow")
	ErrUnexpectedEndOfGroupQuery = fmt.Errorf("proto: unexpected end of group")
)
