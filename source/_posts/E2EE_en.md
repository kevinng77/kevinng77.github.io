---
title: WhatsApp E2EE[en]
date: 2020-11-10
author: Kevin 吴嘉文
subtitle: ''
description: 'This article describe how WhatsApp end-to-end Encryption work. Personally, the key of E2EE is ECDH, in the article ECC, DH and CURVE 25519 are also introduced'
keywords: 
language: en
timezone: ''
categories:
- Cybersecurity|网络安全
tags:
- ECDH, ECC
- WhatsApp Encryption
mathjax: true
toc: true
comments: 基础加密算法分析
---

# E2EE

> WhatsApp end-to-end encryption provide a secure method for user to transmit their messages. ECDH was used to generate the shared master secret for two users. Given the shared secret, Alice and Bob could generate a message key to encrypt the message that they send to each other.
>
> This article describe how WhatsApp end-to-end Encryption work. Personally, the key of E2EE is ECDH, in the article ECC, DH and CURVE 25519 are also introduced

<!--more-->



## Diffie-Hellman 

DH is one of the method that can generate a shared secret for 2 users, the following picture describes the process:

![DH](/img/E2EE_en/DH.jpg)

*(Picture source: blog.csdn.net/sudochen)*

Let's define an operation first:

$$f(m,x) = m^x \mod d, \text {where d is const}$$ 

Based on operation that we defined above, the following lemma holds:

$$f(f(m,x),y) = m^{x^y} = m^{y^x} = f(f(m,y),x)$$ 

Assuming Alice and Bob shared the public Message: Prime modulus - 17, generator - 3

Before generating the shared secret, Alice and Bob have their own private key, which is generate randomly. Let' s assume private key of Alice $$A = 15$$ , private key of Bob $$B =13$$. After that, they  perform the following steps:

+ Alice generated her public key $$ A' = f(3,A) = 3^{15} \mod 17 = 6$$ , and sent it to Bob 

+ Bob generated his public key $$B' = f(3,B) = 3^{13} \mod 17 = 12$$ , and sent it to Alice

+ Alice do $$12^{15}\mod 17= 10$$ to get the secret, which is 10.

+ Bob do $$6^{13}\mod17 = 10$$  to get the secret.

+ Alice and Bob can shared same secret, which is $$12^{15}\mod 17= 10 = 6^{13}\mod17$$ 

Hope you understand how DH works, you might referred to this [vedio](https://www.khanacademy.org/computing/computer-science/cryptography/modern-crypt/v/diffie-hellman-key-exchange-part-2) for more detail. 

The idea of explain DH is that, there exist some trapdoor function such that:

+ This function is one direction. In this case, $$m^x\mod d =  3^{15} \mod 17 = 6$$, if we know m, x and d, it will be easy for us to get the result, which is the public key. However, if we know the public key, m and d. It is difficult for us to derive the x. Therefore the private key of Alice is secure.
+ This function has same associate law and commutative law property with power module, ($$f(f(m,x),y) = m^{x^y} = m^{y^x} = f(f(m,y),x)$$). Such that Alice and Bob can generate a same shared secret.



## ECC

Elliptic Curve Cryptography - ECC is a public key Cryptography to share symmetric encryption keys. Currently, China's second-generation ID card is using 256-bit elliptic curve cryptography, and the virtual currency, Bitcoin, also chooses ECC as the encryption algorithm.

Similar with RSA, ECC is trapdoor function. However, the trapdoor of RSA is the factoring prime numbers while ECC is solving elliptic curve discrete logarithm problem.

### Concept

Elliptic curves: d

$$ y^2 = x^3 + ax+b $$

A and b are constant. The shape of a elliptic curves is similar to the following:

![servlet](/img/E2EE_en/servlet.jpg)

(picture: $$ y^2 = x^3 - 6x + 10 $$ , source: https://devcentral.f5.com/s/articles/real-cryptography-has-curves-making-the-case-for-ecc-20832 )

Property of Elliptic Curves:

+ symmetry about the x-axis
+ Any non-vertical line intersect the curve in at most 3 points



**Point Addition**

Owning to Any non-vertical line intersect the curve in at most 3 points, given 2 points of the 3, we can derive the third one. For instance in the following picture, given P and Q, we can derive -R, which is  $$ (x_R , -y_R) $$. And finally we get R  $$ (x_R , y_R) $$ 

And the process is called Point Addition:

Notation: $$P+Q = R$$

 

![servlet](/img/E2EE_en/servlet.png)



*(picture source: https://devcentral.f5.com/s/articles/real-cryptography-has-curves-making-the-case-for-ecc-20832)*

**Point Doubling**

Given point P, draw the tangent line of P. The line intersect the curve in point -R. Similarly to point addition, the "mirro point" R is the output. This process is called point doubling.

Notation: $$2P = R$$

If we do R point addition P, then we get $$R + P = 2P + P = 3P $$ 

![servlet](/img/E2EE_en/servlet-1605445907032.jpg)

*(picture source: https://devcentral.f5.com/s/articles/real-cryptography-has-curves-making-the-case-for-ecc-20832)*

In case some of the point that we get might located far away from y-axis. A "max" value on the x-axis was set, that performs similar with modulo value. Such that you can get the point within a certain key size. The max value is represented as parameter "p" in ECC

**Parameter in ECC**

+ Curve function: $$y^2 = x^3 + ax+b$$ 
+ G: Generator point on the curve, where we start the computation
+ n: Order of G.
+ h: Cofactor  

### ECC vs. RSA

a 256 bit key size ECC can achieve the same level of security as a 3072 bit key size RSA.

## ECDH 

At first, you might consider ECDH as a Combination of ECC and DH, we replace the power module function with ECC, that should be helpful for your understanding.

### ECDH process

Same here are Alice and Bob. Let give the ECDH function a notation: $$ECDH(x,*args) = x* (*args)$$ 

At the beginning, some basic information about the ECDH is public:

+ The curve is $$y^2 = x^3 + 2x + 2$$
+ p = 17, the max value should be prime number. The curve is considered a prime curve
+ G = (5,1)
+ n = 19

To find n, you Point Double/Point Add starting from G until  reach a point at infinity. That is, the operations continue until the resultant line is vertical. In this case, n = 19.

1) Alice generate random private key a = 3, and use it to generate public key $$A=a*G = 3G = (10,6)$$ . The operation * is point operation we discussed in ECC above. Hence, the public key is a point.

2) same for Bob. He get private key b = 9, and public key $$B = 9G = (7,6)$$.

3) Alice sent public key to Bob. Owning to the trapdoor property of ECC, attacker is difficult to derive private key based on public key and public parameters. 

4) Bob sent public key to Alice.

5) Bob compute the shared secret by： $$Q =b*A = 9 * 3G = 27G = (13,7)$$ 

6) Alice compute the shared secret by $$Q'=a*B = 27G$$ 

Alice、Bob shared same secret since: $$Q=b*A=b*(a*G)=(b*a)*G=(a*b)*G=a*(b*G)=a*B=Q'$$ . This property is similar with DH that we discuss above.



You might referred to [this wiki page](https://en.wikipedia.org/wiki/Elliptic-curve_Diffie%E2%80%93Hellman) for more detail.

### Curve25519

Since ECC need elliptic curve as parameter, Curve25519 is a curve that provide high security. It might be not secure for you to create an elliptic curve and use it for ECDH.

**Parameter in Curve25519**

+ Curve function: $$y^2 = x^3 + 486662x^2+x$$ 
+ base point G: $$ x = 9$$
+ prime umber: $$2^{255} -19$$

If you want more, see [wiki](https://en.wikipedia.org/wiki/Curve25519).  



## E2EE 

### When WhatsApp SET UP 

During install time, 3 key pairs are generated for the user:
+ **Identity Key Pair** – this key is used both for session initiator or recipient, it is the main key pair in E2EE
  + **Curve25519** key pair $$(Alice_s, curve25519(Alice_s,basepoint))$$ 
+ **Signed Pre Key** – A medium-term **Curve25519** key pair, signed by the Identity Key, and rotated on a periodic timed basis.
+ **One-Time Pre Keys** – one time used **Curve25519** key pairs.

### When Account Registration

The app transmits its **public Identity Key**, **public Signed Pre Key (with its signature)**, and a batch of **public One-Time Pre Keys** to the server.

The WhatsApp server stores these public keys associated with the user’s identifier.

### When Initiating Session Setup 

When one build a session for communication with another WhatsApp user:

The initiator generates an ephemeral Curve25519 key pair, $$(E_{initiator},E’_{initiator})$$, to simplify illustration, public key will be noted as $$K^{'}$$. 

As we discussed in ECDH above, for ECDH, given public constant G, the following holds:
$$
\text {Define }ECDH(X,Y)\text{ as operation } X * Y\\
K * G = K'\\
A*B' = A*(B*G) = (A*G)*B = A' * B
$$

And use the property to generate a shared secret:
$$
master\_secret = ECDH(I_{initiator}, S'_{recipient})\\ || ECDH(E_{initiator}, I'_{recipient})\\ || ECDH(E_{initiator}, S'_{recipient})\\ || ECDH(E_{initiator}, O'_{recipient})\\
\\ = master\_secret = ECDH(I'_{initiator}, S_{recipient})\\ || ECDH(E'_{initiator}, I_{recipient})\\ || ECDH(E'_{initiator}, S_{recipient})\\ || ECDH(E'_{initiator}, O_{recipient}).
$$

When a message sent to the recipient, $$E'_{initiator}$$ will be sent together. For each communication session that created, a random different curve 25519 key pair will be generated.

what done here is: 

+ Alice use her private hey to perform ECDH operation with each of Bob's public key. (Remember when initializing, Bob have 3 kinds of key, those key are all Curve25519 keys

Once Alice and Bob have each others public key, they will always get same shared secret.

### When Receiving Session Setup 

At the first time some one receive a message, the recipient receives a message that includes session setup information

1. The recipient calculates the corresponding master_secret using its own private keys and the public keys advertised in the header of the incoming message. **the recipient can generate a same shared master_secret as the initiator, based on the ECDH property** 
2. The recipient deletes the One-Time Pre Key used by the initiator.
3. The initiator uses **HKDF** to derive a corresponding **Root Key** and **Chain Keys** from the master_secret.

### When Exchanging Messages 

#### Compute Chain key - (32-byte)

**Each time a message is transmitted**, an ephemeral Curve25519 public key is advertised along with it. Once a response is received, **a new Chain Key and Root Key are calculated** as:

$$Ephemeral\_secret =
ECDH(E_{sender}, E'_{recipient})$$ 



$$Chain Key, Root Key =
HKDF(Root Key, ephemeral\_secret)$$

#### Compute Message key 

Message key is 80 bytes, where 32 bytes for AES-256 key, 32 bytes for HMAC-SHA256 key, and 16 bytes for IV.

$$Message Key = HMAC-SHA256(Chain Key, 0x01)$$

The Chain Key is then updated as 

$$Chain Key =
HMAC-SHA256(Chain Key, 0x02)$$

So message key change each time, and they always share same message key

 **a stored Message Key can’t be used to derive current or past values of the Chain Key.**

#### Encrypt Message

encrypt using **Message Key, AES-256** in **CBC** mode, and **HMAC-SHA256** for authentication

+ the authentication method are not mentioned
+ I guess it sent: $$(C,S),\ where\ (C,S) = (E(HMAC(M,k_2)||M,k_1),HMAC(M,k_2))$$ 

### Transmitting Media and Other Attachments

Alice want to send a file to Bob: 

+ Alice generates an ephemeral 32 byte AES-256 key, and an ephemeral 32 byte
  HMAC-SHA256 key

+ Alice encrypts the file with AES-256 in CBC mode with a random IV, then appends a MAC of ciphertext using HMAC-SHA256

+ Alice transmits a normal message to Bob, the ephemeral key will be sent together to Bob.

+ Bob download the file, verifies the SHA256 hash, verifies the MAC, and decrypt the file

### Group Messages 

The first time a WhatsApp group member sends a message to a group:

+ The sender generates a random 32-byte Chain Key

+ The sender generates a random Curve25519 Signature Key key pair.

+ The sender combines the 32-byte Chain Key and the public key from the Signature Key into a Sender Key message.

+ The sender **individually** encrypts the Sender Key to each
   member of the group, using the **pairwise messaging protocol** explained previously. 

For all subsequent messages to the group:

+ The sender derives a Message Key from the Chain Key, and updates the Chain Key.

+ The sender encrypts the message using AES-256 in CBC mode.

+ The sender signs the ciphertext using the Signature Key.

+ The sender transmits the single ciphertext message to the server, which does server-side fan-out to all group participants.





## Comment on E2EE

Secure if no consider endpoint attack

Such as for not end-to-end encryption, owning to the message will be sent to a server before transmitting to recipient,  server getting hacked will be a huge problem. However, for end-to-end encryption that seems not to be a problem since there is nothing inject in the middle of the user key exchange. 

