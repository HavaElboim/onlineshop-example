#!/usr/bin/env ruby

require 'net/http'

ENV['URLs'].split(',').each do |url|
  Net::HTTP.get(URI(url))
end