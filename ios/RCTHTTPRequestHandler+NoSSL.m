//
//  RCTHTTPRequestHandler+NoSSL.m
//  IRISSetup
//
//  Created by leonid.mesentsev on 09/03/24.
//

#import "React/RCTBridgeModule.h"
#import "React/RCTHTTPRequestHandler.h"

@implementation RCTHTTPRequestHandler(yourPatchName)

- (void)URLSession:(NSURLSession *)session didReceiveChallenge:(NSURLAuthenticationChallenge *)challenge completionHandler:(void (^)(NSURLSessionAuthChallengeDisposition disposition, NSURLCredential *credential))completionHandler
{
  completionHandler(NSURLSessionAuthChallengeUseCredential, [NSURLCredential credentialForTrust:challenge.protectionSpace.serverTrust]);

}
@end
