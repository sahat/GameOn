# $PROJECTDIR/autotest.rb
watch('.*') { |match_data_object| system('jasmine-node .') }
