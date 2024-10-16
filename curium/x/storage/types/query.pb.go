// Code generated by protoc-gen-gogo. DO NOT EDIT.
// source: storage/query.proto

package types

import (
	context "context"
	fmt "fmt"
	_ "github.com/cosmos/cosmos-sdk/types/query"
	grpc1 "github.com/cosmos/gogoproto/grpc"
	proto "github.com/cosmos/gogoproto/proto"
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
	proto.RegisterType((*QueryHasContentRequest)(nil), "storage.QueryHasContentRequest")
	proto.RegisterType((*QueryHasContentResponse)(nil), "storage.QueryHasContentResponse")
}

func init() { proto.RegisterFile("storage/query.proto", fileDescriptor_4e8535c98d6a78f2) }

var fileDescriptor_4e8535c98d6a78f2 = []byte{
	// 294 bytes of a gzipped FileDescriptorProto
	0x1f, 0x8b, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0xff, 0x74, 0x90, 0xbf, 0x4b, 0x03, 0x31,
	0x14, 0xc7, 0x1b, 0xc5, 0x5f, 0x99, 0x24, 0x82, 0x4a, 0x91, 0x58, 0x2a, 0x82, 0x54, 0xbc, 0x50,
	0x9d, 0x74, 0xd4, 0xc5, 0xd5, 0xc3, 0xc9, 0x2d, 0x39, 0xc3, 0x35, 0x70, 0x97, 0x97, 0x5e, 0x12,
	0xb1, 0xe2, 0x24, 0xb8, 0x0b, 0xfe, 0x53, 0x8e, 0x05, 0x17, 0x47, 0xb9, 0xf3, 0x0f, 0x91, 0xde,
	0x8f, 0x9e, 0xa0, 0x6e, 0x8f, 0x2f, 0x9f, 0xcf, 0x37, 0x2f, 0x0f, 0x6f, 0x58, 0x07, 0x19, 0x8f,
	0x25, 0x1b, 0x7b, 0x99, 0x4d, 0x02, 0x93, 0x81, 0x03, 0xb2, 0x52, 0x87, 0xdd, 0x9d, 0x18, 0x20,
	0x4e, 0x24, 0xe3, 0x46, 0x31, 0xae, 0x35, 0x38, 0xee, 0x14, 0x68, 0x5b, 0x61, 0xdd, 0x41, 0x04,
	0x36, 0x05, 0xcb, 0x04, 0xb7, 0xb5, 0xcf, 0xee, 0x86, 0x42, 0x3a, 0x3e, 0x64, 0x86, 0xc7, 0x4a,
	0x97, 0x70, 0xc5, 0xf6, 0x07, 0x78, 0xf3, 0x6a, 0x46, 0x5c, 0x72, 0x7b, 0x01, 0xda, 0x49, 0xed,
	0x42, 0x39, 0xf6, 0xd2, 0x3a, 0xb2, 0x8e, 0x17, 0x23, 0x75, 0xbb, 0x8d, 0x7a, 0xe8, 0x60, 0x2d,
	0x9c, 0x8d, 0xfd, 0x53, 0xbc, 0xf5, 0x8b, 0xb5, 0x06, 0xb4, 0x95, 0x84, 0x62, 0x3c, 0x9a, 0xa7,
	0xa5, 0xb3, 0x1a, 0xfe, 0x48, 0x8e, 0x9f, 0x11, 0x5e, 0x2a, 0x5d, 0xf2, 0x88, 0x71, 0xeb, 0x93,
	0xdd, 0xa0, 0xfe, 0x52, 0xf0, 0xf7, 0x16, 0xdd, 0xde, 0xff, 0x40, 0xf5, 0x74, 0xff, 0xf0, 0xe9,
	0xfd, 0xeb, 0x75, 0x61, 0x9f, 0xec, 0x31, 0x91, 0xf8, 0x07, 0x99, 0x24, 0x92, 0x45, 0x3e, 0x53,
	0x3e, 0x65, 0xcd, 0x09, 0xdb, 0x3d, 0xce, 0xaf, 0xdf, 0x72, 0x8a, 0xa6, 0x39, 0x45, 0x9f, 0x39,
	0x45, 0x2f, 0x05, 0xed, 0x4c, 0x0b, 0xda, 0xf9, 0x28, 0x68, 0xe7, 0xe6, 0x2c, 0x56, 0x6e, 0xe4,
	0x45, 0x10, 0x41, 0xda, 0x16, 0x35, 0xc3, 0x91, 0xf1, 0x22, 0x51, 0x51, 0x53, 0x7c, 0x3f, 0xaf,
	0x76, 0x13, 0x23, 0xad, 0x58, 0x2e, 0x6f, 0x79, 0xf2, 0x1d, 0x00, 0x00, 0xff, 0xff, 0xbe, 0x8b,
	0x24, 0x4e, 0xb5, 0x01, 0x00, 0x00,
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
	err := c.cc.Invoke(ctx, "/storage.Query/HasContent", in, out, opts...)
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
		FullMethod: "/storage.Query/HasContent",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(QueryServer).HasContent(ctx, req.(*QueryHasContentRequest))
	}
	return interceptor(ctx, in, info, handler)
}

var _Query_serviceDesc = grpc.ServiceDesc{
	ServiceName: "storage.Query",
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
